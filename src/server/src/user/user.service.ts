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
    return this.userModel
      .findOne({ email })
      .populate({
        path: 'classes',
        match: { archived: { $eq: false } },
      })
      .exec();
  }

  async findIdsByEmails(emails: string[]): Promise<any[]> {
    return this.userModel.find({ email: { $in: emails } }, '_id').exec();
  }

  // Update
  async update(email: string, userUpdateDto: UserUpdateDto): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ email }, userUpdateDto, { new: true })
      .exec();
  }

  async joinClass(email: string, classId: Types.ObjectId) {
    await this.userModel.updateOne(
      { email },
      { $addToSet: { classes: classId } },
    );
  }

  async joinClassMany(ids: string[], classId: Types.ObjectId) {
    await this.userModel.updateMany(
      { _id: { $in: ids } },
      { $addToSet: { classes: classId } },
    );
  }

  async leave(_id: Types.ObjectId, classId: Types.ObjectId) {
    await this.userModel.updateOne({ _id }, { $pull: { classes: classId } });
  }

  // Delete
  async delete(id: Types.ObjectId) {
    await this.userModel.findByIdAndDelete(id);
  }
}
