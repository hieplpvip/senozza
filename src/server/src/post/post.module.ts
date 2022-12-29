import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassService } from 'src/class/class.service';
import {
  Class,
  ClassSchema,
  Post,
  PostSchema,
  User,
  UserSchema,
} from 'src/schemas';
import { PostService } from './post.service';
import { CommentService } from './comment/comment.service';
import { PostController } from './post.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, ClassService, CommentService],
  exports: [PostService],
})
export class PostModule {}
