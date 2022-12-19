import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { dto, include, nested, transform } from 'dto-mapper';
import { UserDto } from 'src/user/dto';

@dto()
export class PostDto {
  @include()
  @nested(() => UserDto, false)
  @ApiProperty({ type: () => UserDto })
  user: UserDto;

  @include()
  @transform({
    toDto: (date: Date) => date.toISOString().substring(0, 10),
    fromDto: (str: string) => new Date(str),
  })
  @ApiProperty({ example: '2022-12-24', description: 'Format: YYYY-MM-DD' })
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
