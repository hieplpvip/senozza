import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/schemas/user.schema';

import { UserSerivce } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userSerivce: UserSerivce) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  @ApiOkResponse({ type: User })
  async info(@ExtractedUser() user: User): Promise<User> {
    console.log(user);
    return user;
  }
}
