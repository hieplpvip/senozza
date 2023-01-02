import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Class,
  ClassSchema,
  Notification,
  NotificationSchema,
  Post,
  PostSchema,
  User,
  UserSchema,
} from 'src/schemas';
import { UserService } from 'src/user/user.service';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
      { name: Class.name, schema: ClassSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  providers: [NotificationService, UserService, NotificationGateway],
  controllers: [NotificationController],
  exports: [NotificationService, NotificationGateway],
})
export class NotificationModule {}
