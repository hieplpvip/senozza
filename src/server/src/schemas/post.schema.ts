import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '.';

@Schema()
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Date })
  createdDate: Date;

  @Prop({ type: String })
  content: string;

  @Prop({ type: Number })
  upvote: number;

  @Prop({ type: Number })
  downvote: number;

  @Prop({ type: Boolean })
  bestAnswer: boolean;
}
