import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { NotificationService } from 'src/notification/notification.service';
import { PostService } from 'src/post/post.service';
import { Class, ClassSchema, Notification, NotificationSchema, Post, PostSchema, User, UserSchema } from 'src/schemas';
import { UserService } from 'src/user/user.service';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService, UserService, PostService, NotificationService, NotificationGateway],
  exports: [ClassService],
})
export class ClassModule {}
