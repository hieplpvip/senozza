import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { buildMapper } from 'dto-mapper';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto, UserRegisterDto, UserUpdateDto } from './dto';

// TODO: add tests
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  userMapper(user: User): UserDto {
    const mapper = buildMapper(UserDto);
    return mapper.serialize(user);
  }

  // Create
  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    const createdUser = new this.userModel(userRegisterDto);
    return createdUser.save();
  }

  // Read
  async find(id: Types.ObjectId): Promise<User> {
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

  async joinClass(email: string, classId: Types.ObjectId) {
    const user = await this.userModel.findOne({ email });
    user.classes.push(classId);
    user.save();
  }

  // Delete
  async delete(id: Types.ObjectId) {
    await this.userModel.findByIdAndDelete(id);
  }
}
