import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { buildMapper } from 'dto-mapper';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserRole } from 'src/common/enum';
import { UserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { ClassService } from './class.service';
import { ClassCreateDto, ClassDto } from './dto';

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
    classCreateDto.archived = false;
    const createdClass = await this.classService.create(classCreateDto);
    await this.userService.joinClass(userDto.email, createdClass._id);

    const mapper = buildMapper(ClassDto);
    return mapper.serialize(createdClass);
  }

  /** READ */
  @Get('find')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'code', example: 'CS300' })
  @ApiParam({ name: 'year', example: 2022 })
  @ApiParam({ name: 'semester', example: 2 })
  @ApiOkResponse({ type: ClassDto })
  async find(
    @ExtractedUser() userDto: UserDto,
    @Query('code') courseCode: string,
    @Query('year') year: number,
    @Query('semester') semester: number,
  ): Promise<ClassDto> {
    const foundClass = await this.classService.findByCourse(
      courseCode,
      year,
      semester,
    );

    const mapper = buildMapper(ClassDto);
    return mapper.serialize(foundClass);
  }

  /** UPDATE */

  /** DELETE */
}
