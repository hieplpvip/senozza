import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { buildMapper } from 'dto-mapper';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClassService } from 'src/class/class.service';
import { ClassDto } from 'src/class/dto';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserDto, UserUpdateDto } from './dto';

import { UserService } from './user.service';

@Controller()
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly classService: ClassService) {}

  /** CREATE */

  /** READ */
  @Get('info')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserDto })
  async info(@ExtractedUser() userDto: UserDto): Promise<UserDto> {
    return userDto;
  }

  @Get('listClasses')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ isArray: true, type: ClassDto })
  async infoWithClass(@ExtractedUser() userDto: UserDto): Promise<ClassDto[]> {
    const user = await this.userService.findWithClass(userDto.email);

    const mapper = buildMapper(ClassDto);
    return user.classes.map((item) => mapper.serialize(item));
  }

  /** UPDATE */
  @Post('update')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UserUpdateDto })
  @ApiOkResponse({ type: UserDto })
  async update(@ExtractedUser() userDto: UserDto, @Body() userUpdateDto: UserUpdateDto): Promise<UserDto> {
    const updatedUser = await this.userService.update(userDto.email, userUpdateDto);

    return this.userService.userMapper(updatedUser);
  }

  /** DELETE */
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Boolean })
  async delete(@ExtractedUser() userDto: UserDto): Promise<boolean> {
    const { classes } = await this.userService.findWithClass(userDto.email);
    await Promise.all([
      this.userService.delete(new Types.ObjectId(userDto._id)),
      this.classService.leaveMany(classes, new Types.ObjectId(userDto._id)),
    ]);
    return true;
  }
}
