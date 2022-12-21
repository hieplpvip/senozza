import { PartialType, PickType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { PostDto } from './post.dto';

@dto()
export class PostUpdateDto extends PartialType(
  PickType(PostDto, ['content'] as const),
) {}
