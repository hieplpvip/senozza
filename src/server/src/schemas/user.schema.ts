import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// TODO: add more fields
@Schema()
export class User {
  _id: string;

  @Prop()
  password: string;

  @Prop({ type: String, index: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
