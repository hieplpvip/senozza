import { Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExtractedUser } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/user/dto';
import { NotificationDto } from './dto';
import { NotificationService } from './notification.service';

@Controller()
@ApiTags('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  //** CREATE */

  //** READ */
  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: NotificationDto, isArray: true })
  async listAll(@ExtractedUser() userDto: UserDto): Promise<NotificationDto[]> {
    const notifications = await this.notificationService.listAll(new Types.ObjectId(userDto._id));

    return await this.notificationService.notificationsMapper(notifications);
  }

  //** UPDATE */
  @Put('read')
  @UseGuards(JwtAuthGuard)
  async read(@ExtractedUser() userDto: UserDto, @Query('notificationId') notificationId: string): Promise<void> {
    await this.notificationService.read(new Types.ObjectId(notificationId), new Types.ObjectId(userDto._id));
  }

  @Put('readAll')
  @UseGuards(JwtAuthGuard)
  async readAll(@ExtractedUser() userDto: UserDto): Promise<void> {
    await this.notificationService.readAll(new Types.ObjectId(userDto._id));
  }

  //** DELETE */
}
