import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { Feed, User } from '.';

export type ClassDocument = HydratedDocument<Class>;

@Schema()
export class Class {
  @Prop({ type: Types.ObjectId })
  _id: ObjectId;

  @Prop({ type: String })
  courseCode: string;

  @Prop({ type: String })
  courseName: string;

  @Prop({ type: Number })
  year: number;

  @Prop({ type: Number })
  semester: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  members: Types.ObjectId[];

  @Prop({ type: [{ type: Object }] })
  feed: Feed[];

  @Prop({ type: Boolean })
  archived: boolean;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.index({ courseCode: 1, year: 1, semester: 1 }, { unique: true });
