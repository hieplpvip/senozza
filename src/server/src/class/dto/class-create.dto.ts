import { OmitType } from '@nestjs/swagger';
import { dto } from 'dto-mapper';
import { ClassDto } from './class.dto';

@dto()
export class ClassCreateDto extends OmitType(ClassDto, [
  'members',
  'feeds',
  'chatrooms',
] as const) {}
