import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString, IsUUID } from 'class-validator';
import { dto, include } from 'dto-mapper';
import { Types } from 'mongoose';

@dto()
export class ClassCreateDto {
  @IsUUID()
  _id: Types.ObjectId;

  @include()
  @ApiProperty({ example: 'CS300' })
  @IsString()
  courseCode: string;

  @include()
  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  courseName: string;

  @include()
  @ApiProperty({ example: 2022 })
  @IsInt()
  year: number;

  @include()
  @ApiProperty({ example: 2 })
  @IsInt()
  semester: number;

  @include()
  @ApiProperty()
  @IsBoolean()
  archived: boolean;
}
