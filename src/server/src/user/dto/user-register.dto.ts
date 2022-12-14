import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { dto, include } from 'dto-mapper';
import { UserDto } from './user.dto';

@dto()
export class UserRegisterDto extends OmitType(UserDto, [] as const) {
  @include()
  @ApiProperty({ example: 'demo' })
  @IsString()
  @MinLength(6)
  password: string;
}
