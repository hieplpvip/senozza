import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({
    type: String,
    example: 'user',
  })
  username: string;

  @ApiProperty({
    type: String,
    example: 'user',
  })
  password: string;

  @ApiProperty({
    type: String,
    example: 'user@gmail.com',
  })
  email: string;
}
