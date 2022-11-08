import { ApiProperty } from '@nestjs/swagger';

// TODO: transform user to userDto before sendind (filtering fields)
export class UserDto {
  @ApiProperty({
    type: String,
    example: 'user',
  })
  username: string;

  @ApiProperty({
    type: String,
    example: 'user@gmail.com',
  })
  email: string;
}
