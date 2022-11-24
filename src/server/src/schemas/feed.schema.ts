import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Post } from '.';

@Schema()
export class Feed {
  @Prop({ type: Types.ObjectId })
  _id: ObjectId;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: Object })
  question: Post;

  @Prop([{ type: Object }])
  answers: Post[];

  @Prop({ type: Boolean })
  pin: boolean;
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
