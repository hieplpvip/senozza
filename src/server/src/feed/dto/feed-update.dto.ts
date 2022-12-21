import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { PostUpdateDto } from '../post/dto';
import { FeedDto } from './feed.dto';

@dto()
export class FeedUpdateDto extends PartialType(
  OmitType(FeedDto, ['_id', 'question', 'classId'] as const),
) {
  @ApiProperty({ type: () => PostUpdateDto })
  question: PostUpdateDto;
}
