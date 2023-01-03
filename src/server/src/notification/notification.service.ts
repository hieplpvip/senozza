import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NotificationDocument } from 'src/schemas/notification.schema';
import { UserService } from 'src/user/user.service';
import { NotificationCreateDto, NotificationDto } from './dto';
import { Notification } from 'src/schemas';
import { buildMapper } from 'dto-mapper';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    private readonly userService: UserService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async notificationsMapper(
    notifications: Notification[],
  ): Promise<NotificationDto[]> {
    const mapper = buildMapper(NotificationDto);
    return notifications.map((notification) => mapper.serialize(notification));
  }

  //** CREATE */
  async create(
    notificationCreateDto: NotificationCreateDto,
    classId: string,
    message: string,
  ) {
    const createdNotification = new this.notificationModel(
      notificationCreateDto,
    );
    await createdNotification.save();

    this.notificationGateway.sendNotification(classId, message);
  }

  //** READ */
  async listAll(userId: Types.ObjectId): Promise<any[]> {
    const { classes } = await this.userService.find(userId);

    return this.notificationModel
      .aggregate([
        {
          $match: {
            $or: [{ class: { $in: classes } }, { to: userId }],
          },
        },
        {
          $addFields: {
            read: { $in: [userId, '$readBy'] },
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .exec();
  }

  //** UPDATE */
  async read(notificationId: Types.ObjectId, userId: Types.ObjectId) {
    await this.notificationModel.updateOne(
      { _id: notificationId },
      { $addToSet: { readBy: userId } },
    );
  }

  async readAll(userId: Types.ObjectId) {
    const { classes } = await this.userService.find(userId);
    await this.notificationModel.updateMany(
      { $or: [{ class: { $in: classes } }, { to: userId }] },
      { $addToSet: { readBy: userId } },
    );
  }

  //** DELETE */
}
