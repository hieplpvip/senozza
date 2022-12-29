import { ApiProperty, OmitType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { PostDto } from '.';
import { CommentCreateDto } from '../comment/dto';

@dto()
export class PostCreateDto extends OmitType(PostDto, [
  '_id',
  'pin',
  'question',
] as const) {
  @ApiProperty({ type: () => CommentCreateDto })
  question: CommentCreateDto;
}
