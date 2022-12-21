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
  async listAll(
    feedId: Types.ObjectId,
    sortedField: string,
  ): Promise<Record<string, any>> {
    const sort = {};
    sort[`answers.${sortedField}`] = -1;

    return this.feedModel.aggregate([
      { $match: { _id: feedId } },
      { $unwind: { path: '$answers' } },
      { $sort: sort },
      {
        $lookup: {
          from: 'users',
          localField: 'answers.user',
          foreignField: '_id',
          as: 'answers.user',
        },
      },
      { $unwind: { path: '$answers.user' } },
      { $group: { _id: '_id', answers: { $push: '$answers' } } },
    ]);
  }

  /** UPDATE */
  async vote(feedId: Types.ObjectId, postId: Types.ObjectId, upvote: number) {
    await this.feedModel.updateOne(
      { _id: feedId, 'answers._id': postId },
      { $inc: { 'answers.$.upvote': upvote } },
    );
  }

  /** DELETE */
}
