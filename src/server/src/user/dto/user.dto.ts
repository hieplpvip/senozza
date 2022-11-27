import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
  IsUUID,
} from 'class-validator';
import { dto, include, transform } from 'dto-mapper';
import { ObjectId, Types } from 'mongoose';
import { UserRole } from 'src/common/enum';

@dto()
export class UserDto {
  @include()
  @transform({
    toDto: (_id) => _id.toString(),
    fromDto: (_id) => new Types.ObjectId(_id),
  })
  @ApiProperty({
    type: String,
    example: '6381c95f3411682dda0dddbf',
  })
  @IsUUID()
  _id: ObjectId;

  @include()
  @ApiProperty({
    type: String,
    example: 'user@gmail.com',
  })
  @IsEmail()
  email: string;

  @include()
  @ApiProperty({ example: 'Khoa' })
  @IsString()
  firstName: string;

  @include()
  @ApiProperty({ example: 'Nguyen' })
  @IsString()
  lastName: string;

  @include()
  @ApiProperty({ type: Date, example: '2022-12-24' })
  @IsDate()
  birth: Date;

  @include()
  @transform({
    toDto: (classes) => classes.map((_id) => _id.toString()),
    fromDto: (classes) => classes.map((_id) => new Types.ObjectId(_id)),
  })
  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @IsString({ each: true })
  classes: ObjectId[];

  @include()
  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
