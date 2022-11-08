import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';
import { UserCreateDto } from './dto/user-create.dto';
import { UserSerivce } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userSerivce: UserSerivce) {}

  @Post('create')
  @ApiBody({ type: UserCreateDto })
  @ApiOkResponse({ type: User })
  async create(@Body() userCreateDto: UserCreateDto): Promise<User> {
    const user = this.userSerivce.create(userCreateDto);
    return user;
  }

  @Get('list')
  @ApiOkResponse({
    isArray: true,
    type: User,
  })
  async list(): Promise<User[]> {
    return this.userSerivce.findAll();
  }
}
