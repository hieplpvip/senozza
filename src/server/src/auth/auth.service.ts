import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas';
import { UserLoginDto, UserRegisterDto } from 'src/user/dto';
import { UserSerivce } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserSerivce,
  ) {}

  async generateAccessToken(email: string) {
    return {
      accessToken: this.jwtService.sign({
        sub: email,
      }),
    };
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const { email, password } = userLoginDto;
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('Incorrect email');

    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) throw new NotFoundException('Incorrect password');

    return user;
  }

  async registerUser(userRegisterDto: UserRegisterDto): Promise<User> {
    const { email, password } = userRegisterDto;
    const user = await this.userService.findByEmail(email);
    if (user) throw new NotAcceptableException('Email is already exists');

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    userRegisterDto.password = hash;
    return this.userService.create(userRegisterDto);
  }
}
