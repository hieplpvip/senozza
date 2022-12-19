import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString, IsUUID } from 'class-validator';
import { dto, include, transform } from 'dto-mapper';
import { Types } from 'mongoose';

@dto()
export class ClassDto {
  @include()
  @transform({
    toDto: (_id) => _id.toString(),
    fromDto: (_id) => new Types.ObjectId(_id),
  })
  @ApiProperty({ example: '63a56430c4811d03571c88f1' })
  @IsUUID()
  _id: string;

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
