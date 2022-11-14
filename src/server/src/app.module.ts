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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
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
