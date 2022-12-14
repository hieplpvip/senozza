import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { dto, include, transform } from 'dto-mapper';
import { Types } from 'mongoose';
import { UserRole } from 'src/common/enum';

@dto()
export class UserDto {
  @include()
  @transform({
    toDto: (_id) => _id.toString(),
    fromDto: (_id) => new Types.ObjectId(_id),
  })
  @ApiProperty({ example: '63a56430c4811d03571c88f1' })
  @IsUUID()
  _id: string;

  @include()
  @ApiProperty({ example: 'user@gmail.com' })
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
  @transform({
    toDto: (date: Date) => date.toISOString().substring(0, 10),
    fromDto: (str: string) => new Date(str),
  })
  @ApiProperty({ example: '2022-12-24', description: 'Format: YYYY-MM-DD' })
  @IsDate()
  birth: string;

  @include()
  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
