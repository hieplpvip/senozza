import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // async generateRefreshToken(userId: string) {
  //   return {
  //     refreshToken: this.jwtService.sign(
  //       {
  //         sub: userId
  //       },
  //       {
  //         algorithm: 'HS256',
  //         secret: jwtConstants.secret,
  //         expiresIn: '7d',
  //       }
  //     )
  //   }
  // }

  async generateAccessToken(userId: string) {
    return {
      accessToken: this.jwtService.sign({
        sub: userId,
      }),
    };
  }
}
