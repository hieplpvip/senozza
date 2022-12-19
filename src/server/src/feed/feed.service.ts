import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { buildMapper } from 'dto-mapper';
import { Model } from 'mongoose';
import { Feed, FeedDocument } from 'src/schemas';
import { FeedCreateDto, FeedDto } from './dto';
import { PostDto } from './post/dto/post.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(Feed.name)
    private feedModel: Model<FeedDocument>,
  ) {}

  async feedMapper(feed: Feed): Promise<FeedDto> {
    const feedMapper = buildMapper(FeedDto);
    const postMapper = buildMapper(PostDto);

    const feedDto = feedMapper.serialize(feed);
    feedDto.question = postMapper.serialize(feed.question);
    return feedDto;
  }

  /** CREATE */
  async create(feedCreateDto: FeedCreateDto): Promise<Feed> {
    const createdFeed = new this.feedModel(feedCreateDto);
    await createdFeed.save();

    return createdFeed.populate('question.user');
  }

  /** READ */
}
