import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { dto, include, nested, transform } from 'dto-mapper';
import { Types } from 'mongoose';
import { CommentDto } from '../comment/dto';

@dto()
export class PostDto {
  @include()
  @transform({
    toDto: (_id) => _id.toString(),
    fromDto: (_id) => new Types.ObjectId(_id),
  })
  @ApiProperty({ example: '63a6d616c3a7a193da3da5fd' })
  _id: string;

  @include()
  @ApiProperty({ example: 'Problem set 3 part 4' })
  @IsString()
  title: string;

  @include()
  @ApiProperty({ example: 'Homework 1' })
  @IsString()
  category: string;

  @include()
  @nested(() => CommentDto, false)
  @ApiProperty({ type: () => CommentDto })
  question: CommentDto;

  @include()
  @ApiProperty()
  @IsBoolean()
  pin: boolean;

  @include()
  @transform({
    toDto: (_id) => _id.toString(),
    fromDto: (_id) => new Types.ObjectId(_id),
  })
  @ApiProperty({ example: '63a6d616c3a7a193da3da5fd' })
  classId;
}
