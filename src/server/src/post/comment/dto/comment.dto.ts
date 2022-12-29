import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString, IsUUID } from 'class-validator';
import { dto, include, nested, transform } from 'dto-mapper';
import { Types } from 'mongoose';
import { UserDto } from 'src/user/dto';

@dto()
export class CommentDto {
  @include()
  @transform({
    toDto: (_id) => _id.toString(),
    fromDto: (_id) => new Types.ObjectId(_id),
  })
  @ApiProperty({ example: '63a6d616c3a7a193da3da5fd' })
  @IsUUID()
  _id: string;

  @include()
  @nested(() => UserDto, false)
  @ApiProperty({ type: () => UserDto })
  user: UserDto;

  @include()
  @transform({
    toDto: (date: Date) => date.toISOString(),
    fromDto: (str: string) => new Date(str),
  })
  @ApiProperty({
    example: '2022-12-24T00:00:00.000Z',
    description: 'Format: ISOString',
  })
  @IsDate()
  createdDate: string;

  @include()
  @ApiProperty({ example: 'I’m having a tough time ...' })
  @IsString()
  content: string;

  @include()
  @ApiProperty({ example: 17 })
  @IsNumber()
  upvote: number;

  @include()
  @ApiProperty()
  @IsBoolean()
  bestAnswer: boolean;
}
