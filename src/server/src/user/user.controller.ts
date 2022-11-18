import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
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
}
