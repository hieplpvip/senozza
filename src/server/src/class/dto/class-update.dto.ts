import { OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { dto } from 'dto-mapper';
import { ClassDto } from './class.dto';

@dto()
export class ClassUpdateDto extends PartialType(
  OmitType(ClassDto, ['_id', 'inviteCode'] as const),
) {
  @IsString()
  @Length(6)
  @IsOptional()
  inviteCode?: string;
}
