import { PartialType, PickType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { CommentDto } from './comment.dto';

@dto()
export class CommentUpdateDto extends PartialType(
  PickType(CommentDto, ['content'] as const),
) {}
