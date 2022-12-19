import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema, User, UserSchema } from 'src/schemas';
import { UserService } from 'src/user/user.service';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService, UserService],
  exports: [ClassService],
})
export class ClassModule {}
