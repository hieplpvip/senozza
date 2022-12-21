import { OmitType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { FeedDto } from './feed.dto';

@dto()
export class FeedInfoDto extends OmitType(FeedDto, ['answers'] as const) {}
