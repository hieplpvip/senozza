import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassService } from 'src/class/class.service';
import { Class, ClassSchema } from 'src/schemas';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Class.name, schema: ClassSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, ClassService],
  exports: [UserService],
})
export class UserModule {}
