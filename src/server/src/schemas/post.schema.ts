import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Comment {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ index: true })
  createdDate: Date;

  @Prop()
  content: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  upvote: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  downvote: Types.ObjectId[];

  @Prop({ index: true, default: false })
  bestAnswer: boolean;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema()
export class Post {
  _id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop({ index: true })
  category: string;

  @Prop({ type: CommentSchema })
  question: Comment;

  @Prop({ type: [{ type: CommentSchema }] })
  answers: Comment[];

  @Prop({ index: true, default: false })
  pin: boolean;

  @Prop({ index: true, type: Types.ObjectId, ref: 'Class' })
  classId: Types.ObjectId;
}

export type PostDocument = HydratedDocument<Post>;

export const PostSchema = SchemaFactory.createForClass(Post);
