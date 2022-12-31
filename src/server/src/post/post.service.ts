import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { buildMapper } from 'dto-mapper';
import { Model, Types } from 'mongoose';
import * as flatten from 'flat';
import { Post, PostDocument } from 'src/schemas';
import { PostCreateDto, PostDto, PostUpdateDto } from './dto';
import { CommentDto } from './comment/dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}

  async postMapper(post: Post): Promise<PostDto> {
    const postMapper = buildMapper(PostDto);
    const commentMapper = buildMapper(CommentDto);

    const postDto = postMapper.serialize(post);
    postDto.question = commentMapper.serialize(post.question);
    return postDto;
  }

  async postsMapper(posts: Post[]): Promise<PostDto[]> {
    const postMapper = buildMapper(PostDto);
    const commentMapper = buildMapper(CommentDto);

    return posts.map((post) => {
      const postDto = postMapper.serialize(post);
      postDto.question = commentMapper.serialize(post.question);
      return postDto;
    });
  }

  /** CREATE */
  async create(postCreateDto: PostCreateDto): Promise<Post> {
    const createdpost = new this.postModel(postCreateDto);
    await createdpost.save();

    return createdpost.populate('question.user');
  }

  /** READ */
  async listAll(classId: Types.ObjectId): Promise<Post[]> {
    return this.postModel
      .find({ classId })
      .sort('-pin -question.createdDate')
      .populate('question.user')
      .exec();
  }

  async filterCategory(
    classId: Types.ObjectId,
    category: string,
  ): Promise<Post[]> {
    return this.postModel
      .find({ classId, category })
      .sort('-question.createdDate')
      .populate('question.user')
      .exec();
  }

  /** UPDATE */
  async edit(
    postId: Types.ObjectId,
    postUpdateDto: PostUpdateDto,
  ): Promise<Post> {
    return this.postModel
      .findOneAndUpdate({ _id: postId }, flatten(postUpdateDto))
      .exec();
  }

  /** DELETE */
  async delete(id: Types.ObjectId) {
    await this.postModel.findByIdAndDelete(id);
  }
}
