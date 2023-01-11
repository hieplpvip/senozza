import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { buildMapper } from 'dto-mapper';
import { Model, Types } from 'mongoose';
import { Post, PostDocument } from 'src/schemas';
import { CommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}

  async commentMapper(comment: Comment): Promise<CommentDto> {
    const mapper = buildMapper(CommentDto);
    return mapper.serialize(comment);
  }

  async commentsMapper(comments: Comment[]): Promise<CommentDto[]> {
    const mapper = buildMapper(CommentDto);
    return comments.map((comment) => mapper.serialize(comment));
  }

  /** CREATE */
  async answer(postId: Types.ObjectId, postCreatedDto) {
    const post = await this.postModel.findById(postId);
    post.answers.push(postCreatedDto);
    post.save();
  }

  /** READ */
  async find(
    postId: Types.ObjectId,
    commentId,
    userId: Types.ObjectId,
    sortedField: string,
  ): Promise<Record<string, any>> {
    const sort = {};
    sort[`answers.${sortedField}`] = -1;

    return this.postModel.aggregate([
      { $match: { _id: postId } },
      { $unwind: { path: '$answers' } },
      { $match: { 'answers._id': commentId } },
      {
        $addFields: {
          'answers.vote': {
            $subtract: [{ $size: '$answers.upvote' }, { $size: '$answers.downvote' }],
          },
          'answers.upvote': { $in: [userId, '$answers.upvote'] },
          'answers.downvote': { $in: [userId, '$answers.downvote'] },
        },
      },
      { $sort: { 'answers.bestAnswer': -1, ...sort } },
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
  async upvote(postId: Types.ObjectId, commentId: Types.ObjectId, userId: Types.ObjectId) {
    const post = await this.postModel.findOne({
      _id: postId,
      'answers._id': commentId,
      'answers.downvote': userId,
    });

    if (post) {
      await this.postModel.updateOne(
        { _id: postId, 'answers._id': commentId },
        {
          $pull: { 'answers.$.downvote': userId },
        },
      );
    } else {
      await this.postModel.updateOne(
        { _id: postId, 'answers._id': commentId },
        {
          $addToSet: { 'answers.$.upvote': userId },
        },
      );
    }
  }

  async downvote(postId: Types.ObjectId, commentId: Types.ObjectId, userId: Types.ObjectId) {
    const post = await this.postModel.findOne({
      _id: postId,
      'answers._id': commentId,
      'answers.upvote': userId,
    });

    if (post) {
      await this.postModel.updateOne(
        { _id: postId, 'answers._id': commentId },
        {
          $pull: { 'answers.$.upvote': userId },
        },
      );
    } else {
      await this.postModel.updateOne(
        { _id: postId, 'answers._id': commentId },
        {
          $addToSet: { 'answers.$.downvote': userId },
        },
      );
    }
  }

  async markAnswer(postId: Types.ObjectId, commentId: Types.ObjectId) {
    await this.postModel.updateOne(
      { _id: postId, 'answers.bestAnswer': true },
      { $set: { 'answers.$.bestAnswer': false } },
    );

    await this.postModel.updateOne(
      { _id: postId, 'answers._id': commentId },
      {
        $set: { 'answers.$.bestAnswer': true },
      },
    );
  }

  async edit(postId: Types.ObjectId, commentId: Types.ObjectId, postUpdateDto) {
    const set = {};
    for (const field in postUpdateDto) {
      set['answers.$.' + field] = postUpdateDto[field];
    }

    await this.postModel.updateOne({ _id: postId, 'answers._id': commentId }, { $set: set });
  }

  /** DELETE */
  async delete(postId: Types.ObjectId, commentId: Types.ObjectId) {
    await this.postModel.findByIdAndUpdate(postId, {
      $pull: { answers: { _id: commentId } },
    });
  }
}
