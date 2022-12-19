import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Class {
  _id: Types.ObjectId;

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
  members: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Chatroom' }] })
  chatrooms: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Feed' }] })
  feed: Types.ObjectId[];

  @Prop({ index: true, default: false })
  archived: boolean;
}

export type ClassDocument = HydratedDocument<Class>;

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.index({ courseCode: 1, year: 1, semester: 1 }, { unique: true });
