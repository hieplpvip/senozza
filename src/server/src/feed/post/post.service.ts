import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { buildMapper } from 'dto-mapper';
import { Model, Types } from 'mongoose';
import { Feed, FeedDocument, Post } from 'src/schemas';
import { PostDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Feed.name)
    private feedModel: Model<FeedDocument>,
  ) {}

  async postMapper(posts: Post[]): Promise<PostDto[]> {
    const mapper = buildMapper(PostDto);
    return posts.map((post) => mapper.serialize(post));
  }

  /** CREATE */
  async answer(feedId: Types.ObjectId, postCreatedDto) {
    const feed = await this.feedModel.findById(feedId);
    feed.answers.push(postCreatedDto);
    feed.save();
  }

  /** READ */
  async listAll(feedId: Types.ObjectId) {
    return this.feedModel
      .findById(feedId, 'answers')
      .populate('answers.user')
      .sort('-answer.createdDate')
      .exec();
  }

  /** UPDATE */

  /** DELETE */
}
