import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { dto, include } from 'dto-mapper';
import { Types } from 'mongoose';
import { UserRole } from 'src/common/enum';

@dto()
export class UserRegisterDto {
  constructor(partial: Partial<UserRegisterDto>) {
    Object.assign(this, partial);
  }

  @IsUUID()
  _id: Types.ObjectId;

  @include()
  @ApiProperty({ example: 'demo@gmail.com' })
  @IsEmail()
  email: string;

  @include()
  @ApiProperty({ example: 'demo' })
  @IsString()
  @MinLength(6)
  password: string;

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
  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
