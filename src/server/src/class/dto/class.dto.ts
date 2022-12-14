import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';
import { dto, include } from 'dto-mapper';
import { ObjectId } from 'mongoose';
import { Feed } from 'src/schemas';

@dto()
export class ClassDto {
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

  members: ObjectId[];

  chatrooms: ObjectId[];

  feeds: Feed[];

  @include()
  @ApiProperty()
  @IsBoolean()
  archived: boolean;
}
