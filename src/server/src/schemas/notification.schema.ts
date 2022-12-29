import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Notification {
  _id: string;

  @Prop()
  message: string;

  @Prop({ index: true })
  createdAt: Date;

  @Prop({ type: [{ type: Types.ObjectId }] })
  to: Types.ObjectId[];

  @Prop({ type: Types.ObjectId })
  class: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId }] })
  readBy: Types.ObjectId[];
}

export type NotificationDocument = HydratedDocument<Notification>;

export const NotificationSchema = SchemaFactory.createForClass(Notification);
