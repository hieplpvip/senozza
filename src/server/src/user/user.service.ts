import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserRegisterDto, UserUpdateDto } from './dto';

// TODO: add tests
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // Create
  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    const createdUser = new this.userModel(userRegisterDto);
    return createdUser.save();
  }

  // Find
  async find(id: ObjectId): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findWithClass(email: string): Promise<User> {
    return this.userModel.findOne({ email }).populate('classes').exec();
  }

  // Update
  async update(email: string, userUpdateDto: UserUpdateDto): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ email }, userUpdateDto, {
        new: true,
      })
      .exec();
  }

  async joinClass(email: string, classId: ObjectId) {
    const user = await this.userModel.findOne({ email });
    user.classes.push(classId);
    user.save();
  }
}
