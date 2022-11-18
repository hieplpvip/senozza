import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID } from 'class-validator';
import { dto, include } from 'dto-mapper';

@dto()
export class UserDto {
  @include()
  @ApiProperty({
    type: String,
    example: '6381c95f3411682dda0dddbf',
  })
  @IsUUID()
  _id: string;

  @include()
  @ApiProperty({
    type: String,
    example: 'user@gmail.com',
  })
  @IsEmail()
  email: string;
}
