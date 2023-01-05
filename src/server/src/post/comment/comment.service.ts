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
  async listAll(
    postId: Types.ObjectId,
    sortedField: string,
  ): Promise<Record<string, any>> {
    const sort = {};
    sort[`answers.${sortedField}`] = -1;

    return this.postModel.aggregate([
      { $match: { _id: postId } },
      { $unwind: { path: '$answers' } },
      {
        $addFields: {
          'answers.vote': {
            $subtract: [
              { $size: '$answers.upvote' },
              { $size: '$answers.downvote' },
            ],
          },
        },
      },
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

  async find(
    postId: Types.ObjectId,
    commentId: Types.ObjectId,
  ): Promise<Record<string, any>> {
    return this.postModel.aggregate([
      { $match: { _id: postId } },
      { $unwind: { path: '$answers' } },
      { $match: { 'answers._id': commentId } },
      {
        $addFields: {
          'answers.vote': {
            $subtract: [
              { $size: '$answers.upvote' },
              { $size: '$answers.downvote' },
            ],
          },
        },
      },
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
  async upvote(
    postId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId,
  ) {
    await this.postModel.updateOne(
      { _id: postId, 'answers._id': commentId },
      {
        $pull: { 'answers.$.downvote': userId },
        $push: { 'answers.$.upvote': userId },
      },
    );
  }

  async downvote(
    postId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId,
  ) {
    await this.postModel.updateOne(
      { _id: postId, 'answers._id': commentId },
      {
        $push: { 'answers.$.downvote': userId },
        $pull: { 'answers.$.upvote': userId },
      },
    );
  }

  async edit(postId: Types.ObjectId, commentId: Types.ObjectId, postUpdateDto) {
    const set = {};
    for (const field in postUpdateDto) {
      set['answers.$.' + field] = postUpdateDto[field];
    }

    await this.postModel.updateOne(
      { _id: postId, 'answers._id': commentId },
      { $set: set },
    );
  }

  /** DELETE */
  async delete(postId: Types.ObjectId, commentId: Types.ObjectId) {
    await this.postModel.findByIdAndUpdate(postId, {
      $pull: { answers: { _id: commentId } },
    });
  }
}
