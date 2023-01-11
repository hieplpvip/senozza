import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { buildMapper } from 'dto-mapper';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any): Promise<UserDto> {
    const user = await this.userService.findByEmail(payload.sub);
    if (!user) throw new UnauthorizedException();

    const mapper = buildMapper(UserDto);
    return mapper.serialize(user);
  }
}
