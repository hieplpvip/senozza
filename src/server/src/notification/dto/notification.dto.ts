import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { dto, include, transform } from 'dto-mapper';
import { Types } from 'mongoose';

@dto()
export class NotificationDto {
  @include()
  @transform({
    toDto: (_id) => _id.toString(),
    fromDto: (_id) => new Types.ObjectId(_id),
  })
  @ApiProperty()
  _id: string;

  @include()
  @ApiProperty()
  @IsString()
  message: string;

  @include()
  @transform({
    toDto: (date: Date) => date.toISOString(),
    fromDto: (str: string) => new Date(str),
  })
  @ApiProperty()
  @IsDate()
  createdAt: string;

  @include()
  @ApiProperty()
  @IsBoolean()
  read: boolean;
}
