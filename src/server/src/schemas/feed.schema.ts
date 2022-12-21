import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Post {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ index: true })
  createdDate: Date;

  @Prop()
  content: string;

  @Prop({ index: true, default: 0 })
  upvote: number;

  @Prop({ index: true, default: false })
  bestAnswer: boolean;
}

const PostSchema = SchemaFactory.createForClass(Post);

@Schema()
export class Feed {
  _id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop({ index: true })
  category: string;

  @Prop({ type: PostSchema })
  question: Post;

  @Prop({ type: [{ type: PostSchema }] })
  answers: Post[];

  @Prop({ index: true, default: false })
  pin: boolean;

  @Prop({ index: true, type: Types.ObjectId, ref: 'Class' })
  classId: Types.ObjectId;
}

export type FeedDocument = HydratedDocument<Feed>;

export const FeedSchema = SchemaFactory.createForClass(Feed);
