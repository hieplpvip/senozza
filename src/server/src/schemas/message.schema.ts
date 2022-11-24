import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '.';

@Schema()
export class Message {
  @Prop({ type: Date })
  createdDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  sender: User;

  @Prop({ type: String })
  message: string;
}
