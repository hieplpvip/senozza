import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { buildMapper } from 'dto-mapper';
import { Model, Types } from 'mongoose';
import { Feed, FeedDocument } from 'src/schemas';
import { FeedCreateDto, FeedInfoDto } from './dto';
import { PostDto } from './post/dto/post.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(Feed.name)
    private feedModel: Model<FeedDocument>,
  ) {}

  async feedMapper(feed: Feed): Promise<FeedInfoDto> {
    const feedMapper = buildMapper(FeedInfoDto);
    const postMapper = buildMapper(PostDto);

    const feedDto = feedMapper.serialize(feed);
    feedDto.question = postMapper.serialize(feed.question);
    return feedDto;
  }

  async feedsMapper(feeds: Feed[]): Promise<FeedInfoDto[]> {
    const feedMapper = buildMapper(FeedInfoDto);
    const postMapper = buildMapper(PostDto);

    return feeds.map((feed) => {
      const feedDto = feedMapper.serialize(feed);
      feedDto.question = postMapper.serialize(feed.question);
      return feedDto;
    });
  }

  /** CREATE */
  async create(feedCreateDto: FeedCreateDto): Promise<Feed> {
    const createdFeed = new this.feedModel(feedCreateDto);
    await createdFeed.save();

    return createdFeed.populate('question.user');
  }

  /** READ */
  async listAll(classId: Types.ObjectId): Promise<Feed[]> {
    return this.feedModel
      .find({ classId })
      .sort('-question.createdDate')
      .populate('question.user')
      .exec();
  }
}
