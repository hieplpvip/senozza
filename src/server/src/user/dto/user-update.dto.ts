import { OmitType, PartialType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { UserDto } from './user.dto';

@dto()
export class UserUpdateDto extends PartialType(
  OmitType(UserDto, ['email', '_id'] as const),
) {}
