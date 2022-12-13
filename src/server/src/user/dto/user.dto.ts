import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';
import { dto, include } from 'dto-mapper';
import { ObjectId } from 'mongoose';
import { UserRole } from 'src/common/enum';

@dto()
export class UserDto {
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

  classes: ObjectId[];

  @include()
  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
