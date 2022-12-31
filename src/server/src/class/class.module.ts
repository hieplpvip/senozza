import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from 'src/post/post.service';
import {
  Class,
  ClassSchema,
  Post,
  PostSchema,
  User,
  UserSchema,
} from 'src/schemas';
import { UserService } from 'src/user/user.service';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService, UserService, PostService],
  exports: [ClassService],
})
export class ClassModule {}
