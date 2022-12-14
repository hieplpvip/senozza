import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';
import { dto, include, transform } from 'dto-mapper';
import { UserRole } from 'src/common/enum';

@dto()
export class UserDto {
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
