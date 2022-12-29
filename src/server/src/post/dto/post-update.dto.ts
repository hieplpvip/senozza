import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { PostDto } from '.';
import { CommentUpdateDto } from '../comment/dto';

@dto()
export class PostUpdateDto extends PartialType(
  OmitType(PostDto, ['_id', 'question', 'classId'] as const),
) {
  @ApiProperty({ type: () => CommentUpdateDto })
  question: CommentUpdateDto;
}
