import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ example: 'demo@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'demo' })
  @IsString()
  @MinLength(6)
  password: string;
}
