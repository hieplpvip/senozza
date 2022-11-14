import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

// TODO: transform user to userDto before sendind (filtering fields)
// TODO: add validator
export class UserDto {
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    type: String,
    example: 'user@gmail.com',
  })
  @IsEmail()
  email: string;
}
