import { Body, Controller, NotFoundException, Post, Res } from '@nestjs/common';
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
          example:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxYzk1ZjM0MTE2ODJkZGEwZGRkYmYiLCJpYXQiOjE2Njk0NTI4NTYsImV4cCI6MTY2OTQ1MjkxNn0.-6Wkt0E2PZPCZA1yyHAoJpuvtZYZ42uKa8BYdQ4srvQ',
        },
      },
    },
  })
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res() res: Response,
  ): Promise<unknown> {
    const user = await this.userService.validateUser(userLoginDto);

    // TODO: refresh token
    // const { refreshToken } = await this.authService.generateRefreshToken(user._id);
    // console.log(refreshToken);
    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   maxAge: parseInt(process.env.cookie_max_age),
    // });
    const accessToken = await this.authService.generateAccessToken(user._id);

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
          example:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzgxYzk1ZjM0MTE2ODJkZGEwZGRkYmYiLCJpYXQiOjE2Njk0NTI4NTYsImV4cCI6MTY2OTQ1MjkxNn0.-6Wkt0E2PZPCZA1yyHAoJpuvtZYZ42uKa8BYdQ4srvQ',
        },
      },
    },
  })
  async register(
    @Body() userRegisterDto: UserRegisterDto,
    @Res() res: Response,
  ): Promise<unknown> {
    const user = await this.userService.registerUser(userRegisterDto);

    // const { refreshToken } = await this.authService.generateRefreshToken(user._id);
    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   maxAge: parseInt(process.env.cookie_max_age),
    // });
    const accessToken = await this.authService.generateAccessToken(user._id);

    return res.send(accessToken);
  }
}
