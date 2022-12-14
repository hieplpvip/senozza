import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

@Schema()
export class Post {
  _id: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: ObjectId;

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
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop({ index: true })
  category: string;

  @Prop({ type: PostSchema })
  question: Post;

  @Prop([{ type: [{ type: PostSchema }] }])
  answers: Post[];

  @Prop({ index: true, default: false })
  pin: boolean;
}

const FeedSchema = SchemaFactory.createForClass(Feed);

@Schema()
export class Class {
  _id: ObjectId;

  @Prop()
  courseCode: string;

  @Prop()
  courseName: string;

  @Prop()
  year: number;

  @Prop()
  semester: number;

  @Prop({ type: [{ type: String }] })
  categories: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  members: ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Chatroom' }] })
  chatrooms: ObjectId[];

  @Prop({ type: [{ type: FeedSchema }] })
  feed: Feed[];

  @Prop({ index: true, default: false })
  archived: boolean;
}

export type ClassDocument = HydratedDocument<Class>;

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.index({ courseCode: 1, year: 1, semester: 1 }, { unique: true });
