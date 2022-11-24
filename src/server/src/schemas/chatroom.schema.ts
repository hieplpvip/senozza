import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Message, User } from '.';

@Schema()
export class Chatroom {
  @Prop({ type: Types.ObjectId })
  _id: ObjectId;

  @Prop({ type: Boolean })
  private: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  members: User[];

  @Prop({ type: [{ type: Object }] })
  messages: Message[];
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
