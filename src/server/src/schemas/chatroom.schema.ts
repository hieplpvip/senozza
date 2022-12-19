import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

@Schema()
export class Message {
  _id: Types.ObjectId;

  @Prop({ index: true })
  createdDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  sender: Types.ObjectId;

  @Prop()
  message: string;
}

const MessageSchema = SchemaFactory.createForClass(Message);

@Schema()
export class Chatroom extends Document {
  _id: Types.ObjectId;

  @Prop({ index: true })
  private: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  members: Types.ObjectId[];

  @Prop({ type: [{ type: MessageSchema }] })
  messages: Message[];
}

export type ChatroomDocument = HydratedDocument<Chatroom>;

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
