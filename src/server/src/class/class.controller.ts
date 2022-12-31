import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserRole } from 'src/common/enum';
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

    return this.classService.classMapper(foundClass);
  }

  @Get('listStudent')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ClassDto, isArray: true })
  async listStudent(
    @ExtractedUser() userDto: UserDto,
    @Query('classId') classId: string,
  ): Promise<UserDto[]> {
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

    return this.classService.classMapper(foundClass);
  }

  @Get('renewCode')
  @Roles(UserRole.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: String })
  async renewCode(@Query('classId') classId: string): Promise<string> {
    const inviteCode = this.classService.generateCode();
    await this.classService.update(new Types.ObjectId(classId), { inviteCode });
    return inviteCode;
  }

  @Put('invite')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: String, isArray: true })
  async invite(
    @Query('classId') id: string,
    @Body('emails') userEmails: string[],
  ) {
    const users = await this.userService.findIdsByEmails(userEmails);
    const userIds = users.map((user) => user._id);
    const classId = new Types.ObjectId(id);

    await Promise.all([
      this.classService.addMembers(classId, userIds),
      this.userService.joinClassMany(userIds, classId),
    ]);
  }

  @Put('join')
  @UseGuards(JwtAuthGuard)
  async join(@ExtractedUser() userDto: UserDto, @Query('code') code: string) {
    const foundClass = await this.classService.findIdByCode(code);
    if (!foundClass) throw new NotFoundException('Class not found');

    const userIds = [new Types.ObjectId(userDto._id)];
    await Promise.all([
      this.classService.addMembers(foundClass._id, userIds),
      this.userService.joinClass(userDto.email, foundClass._id),
    ]);
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
  }

  /** DELETE */
  @Delete('delete')
  @Roles(UserRole.INSTRUCTOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: Boolean })
  async delete(@Query('classId') classId: string): Promise<boolean> {
    const { members } = await this.classService.find(
      new Types.ObjectId(classId),
    );
    await Promise.all([
      this.classService.delete(new Types.ObjectId(classId)),
      this.userService.leaveClassMany(members, new Types.ObjectId(classId)),
    ]);

    return true;
  }
}
