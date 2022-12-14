import { ApiProperty, OmitType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { PostCreateDto } from '../post/dto/post-create.dto';
import { FeedDto } from './feed.dto';

@dto()
export class FeedCreateDto extends OmitType(FeedDto, [
  '_id',
  'answers',
  'pin',
  'question',
] as const) {
  @ApiProperty({ type: () => PostCreateDto })
  question: PostCreateDto;
}
