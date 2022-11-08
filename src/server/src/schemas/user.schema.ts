import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// TODO: add more fields
@Schema()
export class User {
  @Prop({ type: String, index: true, unique: true })
  @ApiProperty({
    type: String,
    example: 'user',
  })
  username: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ type: String, index: true, unique: true })
  @ApiProperty({
    type: String,
    example: 'user@gmail.com',
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
