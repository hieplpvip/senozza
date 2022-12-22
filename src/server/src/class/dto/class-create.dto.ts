import { OmitType } from '@nestjs/swagger';
import { IsBoolean, IsString, Length } from 'class-validator';
import { dto } from 'dto-mapper';
import { ClassDto } from './class.dto';

@dto()
export class ClassCreateDto extends OmitType(ClassDto, [
  'archived',
  '_id',
  'inviteCode',
] as const) {
  @IsBoolean()
  archived: boolean;

  @IsString()
  @Length(6)
  inviteCode: string;
}
