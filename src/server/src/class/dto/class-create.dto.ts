import { OmitType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { dto } from 'dto-mapper';
import { ClassDto } from './class.dto';

@dto()
export class ClassCreateDto extends OmitType(ClassDto, [
  'members',
  'feeds',
  'chatrooms',
  'archived',
] as const) {
  @IsBoolean()
  archived: boolean;
}
