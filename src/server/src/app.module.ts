import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ClassModule } from './class/class.module';
import { RouterModule } from '@nestjs/core';
import configuration from './common/config/configuration';
import { PostModule } from './post/post.module';
import { CommentModule } from './post/comment/comment.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.production', '.env.dev'],
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('database.uri'),
      }),
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
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
      {
        path: 'notification',
        module: NotificationModule,
      },
    ]),
    UserModule,
    ClassModule,
    PostModule,
    CommentModule,
    NotificationModule,
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
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
