import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { UserRole } from 'src/common/enum';
import { Class } from '.';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: Types.ObjectId })
  _id: ObjectId;

  @Prop()
  password: string;

  @Prop({ type: String, index: true, unique: true })
  email: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: Date })
  birth: Date;

  @Prop({ type: String, enum: UserRole })
  role: UserRole;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Class' }] })
  classes: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
