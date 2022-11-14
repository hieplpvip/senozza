import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/schemas/user.schema';
import { UserSerivce } from 'src/user/user.service';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UserSerivce))
    private userService: UserSerivce,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.find(payload.sub);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
