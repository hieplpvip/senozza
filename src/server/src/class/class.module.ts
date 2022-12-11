import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema, User, UserSchema } from 'src/schemas';
import { UserModule } from 'src/user/user.module';
import { UserSerivce } from 'src/user/user.service';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UserModule,
  ],
  controllers: [ClassController],
  providers: [ClassService, UserSerivce],
  exports: [ClassService],
})
export class ClassModule {}