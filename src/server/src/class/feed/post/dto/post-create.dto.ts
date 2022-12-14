import { OmitType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { Types } from 'mongoose';
import { PostDto } from './post.dto';

@dto()
export class PostCreateDto extends OmitType(PostDto, [
  '_id',
  'bestAnswer',
  'upvote',
  'user',
] as const) {
  user: Types.ObjectId;
}
