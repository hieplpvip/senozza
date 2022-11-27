import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { buildMapper } from 'dto-mapper';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserDto } from './dto/user.dto';

import { UserSerivce } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userSerivce: UserSerivce) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  @ApiOkResponse({ type: UserDto })
  async info(@ExtractedUser() userDto: UserDto): Promise<UserDto> {
    return userDto;
  }

  @UseGuards(JwtAuthGuard)
  @Get('infoWithClass')
  @ApiOkResponse({ type: UserDto })
  async infoWithClass(@ExtractedUser() userDto: UserDto): Promise<UserDto> {
    return this.userSerivce.findWithClass(userDto.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
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
