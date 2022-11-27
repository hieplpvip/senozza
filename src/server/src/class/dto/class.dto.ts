import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';
import { dto, include, transform } from 'dto-mapper';
import { ObjectId, Types } from 'mongoose';
import { Feed, User } from 'src/schemas';

@dto()
export class ClassDto {
  @IsUUID()
  _id: ObjectId;

  @include()
  @ApiProperty({ example: 'CS300' })
  @IsString()
  courseCode: string;

  @include()
  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  courseName: string;

  @include()
  @ApiProperty({ type: Number, example: 2022 })
  @IsInt()
  year: number;

  @include()
  @ApiProperty({ type: Number, example: 2 })
  @IsInt()
  semester: number;

  @include()
  @transform({
    toDto: (members) => members.map((_id) => _id.toString()),
    fromDto: (members) => members.map((_id) => new Types.ObjectId(_id)),
  })
  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @IsObject({ each: true })
  members: ObjectId[];

  // @include()
  // @ApiProperty({ isArray: true, type: Feed })
  // @IsArray()
  // @IsObject({ each: true })
  // feed: Feed[];

  @include()
  @IsBoolean()
  archived: boolean;
}
