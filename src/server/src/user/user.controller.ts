import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { buildMapper } from 'dto-mapper';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClassDto } from 'src/class/dto';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserDto, UserUpdateDto } from './dto';

import { UserSerivce } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userSerivce: UserSerivce) {}

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
    const user = await this.userSerivce.findWithClass(userDto.email);

    const mapper = buildMapper(ClassDto);
    return user.classes.map((item) => mapper.serialize(item));
  }

  /** UPDATE */
  @Post('update')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UserUpdateDto })
  @ApiOkResponse({ type: UserDto })
  async update(
    @ExtractedUser() userDto: UserDto,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserDto> {
    const updatedUser = await this.userSerivce.update(
      userDto.email,
      userUpdateDto,
    );

    const mapper = buildMapper(UserDto);
    return mapper.serialize(updatedUser);
  }
}
