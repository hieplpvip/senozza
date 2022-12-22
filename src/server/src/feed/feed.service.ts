import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { buildMapper } from 'dto-mapper';
import { Model, Types } from 'mongoose';
import { Feed, FeedDocument } from 'src/schemas';
import { FeedCreateDto, FeedDto, FeedUpdateDto } from './dto';
import { PostDto } from './post/dto/post.dto';
import * as flatten from 'flat';

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

  async feedsMapper(feeds: Feed[]): Promise<FeedDto[]> {
    const feedMapper = buildMapper(FeedDto);
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

  async listPin(classId: Types.ObjectId): Promise<Feed[]> {
    return this.feedModel
      .find({ classId, pin: true })
      .sort('-question.createdDate')
      .populate('question.user')
      .exec();
  }

  async filterCategory(
    classId: Types.ObjectId,
    category: string,
  ): Promise<Feed[]> {
    return this.feedModel
      .find({ classId, category })
      .sort('-question.createdDate')
      .populate('question.user')
      .exec();
  }

  /** UPDATE */
  async edit(feedId: Types.ObjectId, feedUpdateDto: FeedUpdateDto) {
    await this.feedModel.updateOne({ _id: feedId }, flatten(feedUpdateDto));
  }

  /** DELETE */
  async delete(id: Types.ObjectId) {
    await this.feedModel.findByIdAndDelete(id);
  }
}
