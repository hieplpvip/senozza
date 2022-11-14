import { PartialType } from '@nestjs/swagger';
import { UserRegisterDto } from './user-register.dto';

export class UserUpdateDto extends PartialType(UserRegisterDto) {}
