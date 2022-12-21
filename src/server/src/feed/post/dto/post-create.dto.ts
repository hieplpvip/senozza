import { OmitType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { Types } from 'mongoose';
import { PostDto } from './post.dto';

@dto()
export class PostCreateDto extends OmitType(PostDto, [
  'bestAnswer',
  'upvote',
  'user',
  '_id',
] as const) {
  user: Types.ObjectId;
}
