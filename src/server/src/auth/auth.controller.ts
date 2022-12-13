import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { Response } from 'express';
import { UserRegisterDto } from '../user/dto/user-register.dto';
import { UserSerivce } from 'src/user/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly userService: UserSerivce,
  ) {}

  @Post('login')
  @ApiBody({ type: UserLoginDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
      },
    },
  })
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res() res: Response,
  ): Promise<unknown> {
    const user = await this.authService.validateUser(userLoginDto);

    // TODO: refresh token
    // const { refreshToken } = await this.authService.generateRefreshToken(user._id);
    // console.log(refreshToken);
    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   maxAge: parseInt(process.env.cookie_max_age),
    // });
    const accessToken = await this.authService.generateAccessToken(user.email);

    return res.send(accessToken);
  }

  @Post('register')
  @ApiBody({ type: UserRegisterDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
      },
    },
  })
  async register(
    @Body() userRegisterDto: UserRegisterDto,
    @Res() res: Response,
  ): Promise<unknown> {
    const user = await this.authService.registerUser(userRegisterDto);

    // const { refreshToken } = await this.authService.generateRefreshToken(user._id);
    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   maxAge: parseInt(process.env.cookie_max_age),
    // });
    const accessToken = await this.authService.generateAccessToken(user.email);

    return res.send(accessToken);
  }
}
