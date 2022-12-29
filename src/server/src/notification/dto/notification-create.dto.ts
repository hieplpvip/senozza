import { OmitType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { NotificationDto } from '.';

export class NotificationCreateDto extends OmitType(NotificationDto, [
  '_id',
  'read',
] as const) {
  constructor(partial: Partial<NotificationCreateDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  to: Types.ObjectId[];

  class: Types.ObjectId;
}
