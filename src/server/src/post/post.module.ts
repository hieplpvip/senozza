import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassService } from 'src/class/class.service';
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
import { PostService } from './post.service';
import { CommentService } from './comment/comment.service';
import { PostController } from './post.controller';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    ClassService,
    CommentService,
    NotificationService,
    NotificationGateway,
    UserService,
  ],
  exports: [PostService],
})
export class PostModule {}
