import { OmitType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { Types } from 'mongoose';
import { CommentDto } from './comment.dto';

@dto()
export class CommentCreateDto extends OmitType(CommentDto, [
  'bestAnswer',
  'vote',
  'user',
  '_id',
] as const) {
  user: Types.ObjectId;
}
