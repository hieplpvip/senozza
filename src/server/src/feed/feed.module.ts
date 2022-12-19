import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassService } from 'src/class/class.service';
import {
  Class,
  ClassSchema,
  Feed,
  FeedSchema,
  User,
  UserSchema,
} from 'src/schemas';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { PostService } from './post/post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
      { name: Feed.name, schema: FeedSchema },
    ]),
  ],
  controllers: [FeedController],
  providers: [FeedService, ClassService, PostService],
  exports: [FeedService],
})
export class FeedModule {}
