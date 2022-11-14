import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

// TODO: add fields to register
export class UserRegisterDto {
  constructor(partial: Partial<UserRegisterDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: 'demo@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'demo' })
  @IsString()
  @MinLength(6)
  password: string;
}
