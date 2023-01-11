import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  NotFoundException,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserRole } from 'src/common/enum';
import { NotificationCreateDto } from 'src/notification/dto';
import { NotificationService } from 'src/notification/notification.service';
import { UserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { ClassService } from './class.service';
import { ClassCreateDto, ClassDto, ClassUpdateDto } from './dto';

@Controller()
@ApiTags('class')
export class ClassController {
  constructor(
    private readonly classService: ClassService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  /** CREATE */
  @Post('create')
  @Roles(UserRole.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: ClassCreateDto })
  @ApiOkResponse({ type: ClassDto })
  async create(
    @ExtractedUser() userDto: UserDto,
    @Body() classCreateDto: ClassCreateDto,
  ): Promise<ClassDto> {
    const foundClass = await this.classService.findByCourse(classCreateDto);
    if (foundClass)
      throw new ConflictException({ message: 'Class already exists' });

    classCreateDto.archived = false;
    classCreateDto.inviteCode = this.classService.generateCode();
    while (
      (await this.classService.findByCode(classCreateDto.inviteCode)) !== null
    ) {
      classCreateDto.inviteCode = this.classService.generateCode();
    }
    const createdClass = await this.classService.create(classCreateDto);

    const userIds = [new Types.ObjectId(userDto._id)];
    await Promise.all([
      await this.classService.addMembers(createdClass._id, userIds),
      await this.userService.joinClass(userDto.email, createdClass._id),
    ]);

    return this.classService.classMapper(createdClass);
  }

  /** READ */
  @Get('find')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ClassDto })
  async find(
    @ExtractedUser() userDto: UserDto,
    @Query('classId') classId: string,
  ): Promise<ClassDto> {
    const foundClass = await this.classService.find(
      new Types.ObjectId(classId),
    );

    if (!foundClass)
      throw new NotFoundException({ message: 'Class not found' });

    return this.classService.classMapper(foundClass);
  }

  @Get('listStudent')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserDto, isArray: true })
  async listStudent(
    @ExtractedUser() userDto: UserDto,
    @Query('classId') classId: string,
  ): Promise<UserDto[]> {
    const joined = await this.userService.findInClass(
      new Types.ObjectId(userDto._id),
      new Types.ObjectId(classId),
    );
    if (!joined) throw new NotAcceptableException({ message: 'Not in class' });

    const { members } = await this.classService.listStudent(
      new Types.ObjectId(classId),
    );
    return await this.userService.usersMapper(members);
  }

  /** UPDATE */
  @Put('update')
  @Roles(UserRole.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: ClassDto })
  async update(
    @Query('classId') id: string,
    @Body() classUpdateDto: ClassUpdateDto,
  ): Promise<ClassUpdateDto> {
    const foundClass = await this.classService.update(
      new Types.ObjectId(id),
      classUpdateDto,
    );

    if (!foundClass)
      throw new NotFoundException({ message: 'Class not found' });

    return this.classService.classMapper(foundClass);
  }

  @Put('invite')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: [String], isArray: true })
  async invite(
    @Query('classId') id: string,
    @Body('emails') userEmails: string[],
  ) {
    const users = await this.userService.findIdsByEmails(userEmails);
    const userIds = users.map((user) => user._id);
    const classId = new Types.ObjectId(id);
    const _class = await this.classService.find(classId);
    if (!_class) throw new NotFoundException('Class not found');

    await Promise.all([
      this.classService.addMembers(classId, userIds),
      this.userService.joinClassMany(userIds, classId),
    ]);

    const { courseCode, courseName } = _class;
    const notification = new NotificationCreateDto({
      message: `You have been invited to class ${courseCode}-${courseName}`,
      createdAt: new Date().toISOString(),
      to: userIds,
    });
    await this.notificationService.create(notification, id, 'invited');

    return { message: 'Invited' };
  }

  @Put('join')
  @UseGuards(JwtAuthGuard)
  async join(@ExtractedUser() userDto: UserDto, @Query('code') code: string) {
    const foundClass = await this.classService.findByCode(code);
    if (!foundClass) throw new NotFoundException('Class not found');
    const joined = await this.userService.findInClass(
      new Types.ObjectId(userDto._id),
      new Types.ObjectId(foundClass._id),
    );
    if (joined)
      throw new NotAcceptableException({ message: 'Already in class' });

    const userIds = [new Types.ObjectId(userDto._id)];
    await Promise.all([
      this.classService.addMembers(foundClass._id, userIds),
      this.userService.joinClass(userDto.email, foundClass._id),
    ]);

    const { courseCode, courseName } = foundClass;
    const notification = new NotificationCreateDto({
      message: `You have joined class ${courseCode}-${courseName}`,
      createdAt: new Date().toISOString(),
      to: userIds,
    });
    await this.notificationService.create(
      notification,
      foundClass._id.toString(),
      'invited',
    );

    return { message: 'Joined' };
  }

  @Put('leave')
  @UseGuards(JwtAuthGuard)
  async leave(
    @ExtractedUser() userDto: UserDto,
    @Query('classId') _id: string,
  ) {
    const userId = new Types.ObjectId(userDto._id);
    const classId = new Types.ObjectId(_id);
    await Promise.all([
      this.userService.leaveClass(userId, classId),
      this.classService.leave(classId, userId),
    ]);

    return { message: 'Left' };
  }

  @Put('kick')
  @Roles(UserRole.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async kick(@Query('classId') _id: string, @Query('userId') userId: string) {
    const classId = new Types.ObjectId(_id);
    const user = new Types.ObjectId(userId);
    await Promise.all([
      this.userService.leaveClass(user, classId),
      this.classService.leave(classId, user),
    ]);

    return { message: 'Kicked' };
  }

  /** DELETE */
  @Delete('delete')
  @Roles(UserRole.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Query('classId') classId: string) {
    const { members } = await this.classService.find(
      new Types.ObjectId(classId),
    );
    await Promise.all([
      this.classService.delete(new Types.ObjectId(classId)),
      this.userService.leaveClassMany(members, new Types.ObjectId(classId)),
    ]);

    return { message: 'Deleted' };
  }
}
