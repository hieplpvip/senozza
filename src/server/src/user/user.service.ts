import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';

// TODO: add tests
@Injectable()
export class UserSerivce {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // Auth
  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const { email, password } = userLoginDto;
    const user = await this.findByEmail(email);
    if (!user) throw new NotFoundException('Incorrect email');

    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) throw new NotFoundException('Incorrect password');

    return user;
  }

  async registerUser(userRegisterDto: UserRegisterDto): Promise<User> {
    const { email, password } = userRegisterDto;
    const user = await this.findByEmail(email);
    if (user) throw new NotAcceptableException('Email is already exists');

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return this.create(
      new UserRegisterDto({
        ...userRegisterDto,
        password: hash,
      }),
    );
  }

  // Create
  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    const createdUser = new this.userModel(userRegisterDto);
    return createdUser.save();
  }

  // Find
  async find(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Update
}
