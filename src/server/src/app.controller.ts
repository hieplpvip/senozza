import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) {}

  @Get()
  getHello(): string {
    console.log(process.env.JWT_SECRET_KEY);
    console.log(this.configService.get('jwt.secret'));
    console.log(this.configService.get('jwt.expire'));
    return this.appService.getHello();
  }
}
