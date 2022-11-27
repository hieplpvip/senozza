import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { buildMapper } from 'dto-mapper';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/user/dto/user.dto';
import { UserSerivce } from 'src/user/user.service';
import { ClassService } from './class.service';
import { ClassCreateDto, ClassDto } from './dto';

@ApiTags('Class')
@Controller('class')
export class ClassController {
  constructor(
    private readonly classService: ClassService,
    private readonly userService: UserSerivce,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBody({ type: ClassCreateDto })
  @ApiOkResponse({ type: ClassDto })
  async create(
    @ExtractedUser() userDto: UserDto,
    @Body() classCreateDto: ClassCreateDto,
  ): Promise<ClassDto> {
    const createdClass = await this.classService.create(classCreateDto);
    await this.userService.joinClass(userDto.email, createdClass._id);

    const mapper = buildMapper(ClassDto);
    return mapper.serialize(createdClass);
  }
}
