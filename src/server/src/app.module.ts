import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ClassModule } from './class/class.module';
import { RouterModule } from '@nestjs/core';
import configuration from './common/config/configuration';
import { PostModule } from './post/post.module';
import { CommentModule } from './post/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.dev'],
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    RouterModule.register([
      {
        path: 'user',
        module: UserModule,
      },
      {
        path: 'class',
        module: ClassModule,
      },
      {
        path: 'post',
        module: PostModule,
        children: [
          {
            path: 'comment',
            module: CommentModule,
          },
        ],
      },
    ]),
    UserModule,
    ClassModule,
    PostModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    /*
     * Common middleware:
     * - Helmet: Security http headers
     * - Compression: Gzip, deflate
     * - Rate limiting
     */
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
