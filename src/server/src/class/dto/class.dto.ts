import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { dto, include, mapTo, transform } from 'dto-mapper';
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
  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @include()
  @mapTo('members')
  @transform({
    toDto: (members) => members.length,
    fromDto: (members) => members,
  })
  @ApiProperty({ example: 2 })
  @IsInt()
  memberCount: number;

  @include()
  @ApiProperty()
  @IsBoolean()
  archived: boolean;

  @include()
  @ApiProperty()
  @IsString()
  @Length(6)
  inviteCode: string;
}
