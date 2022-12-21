import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { dto, include, nested, transform } from 'dto-mapper';
import { Types } from 'mongoose';
import { PostDto } from '../post/dto/post.dto';

@dto()
export class FeedDto {
  @include()
  @transform({
    toDto: (_id) => _id.toString(),
    fromDto: (_id) => new Types.ObjectId(_id),
  })
  @ApiProperty({ example: '63a6d616c3a7a193da3da5fd' })
  @IsUUID()
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
  @nested(() => PostDto, false)
  @ApiProperty({ type: () => PostDto })
  question: PostDto;

  @include()
  @nested(() => PostDto, true)
  @ApiProperty({ type: () => PostDto, isArray: true })
  answers: PostDto[];

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
  @IsUUID()
  classId;
}
