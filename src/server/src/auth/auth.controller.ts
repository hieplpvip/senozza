import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { Response } from 'express';
import { UserRegisterDto } from '../user/dto/user-register.dto';
import { buildMapper } from 'dto-mapper';
import { UserDto } from 'src/user/dto';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

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
  async login(@Body() userLoginDto: UserLoginDto, @Res() res: Response): Promise<unknown> {
    const user = await this.authService.validateUser(userLoginDto);

    const accessToken = await this.authService.generateAccessToken(user.email);
    const mapper = buildMapper(UserDto);
    const userDto = mapper.serialize(user);
    return res.send({
      accessToken,
      user: userDto,
    });
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
  async register(@Body() userRegisterDto: UserRegisterDto, @Res() res: Response): Promise<unknown> {
    const user = await this.authService.registerUser(userRegisterDto);

    const accessToken = await this.authService.generateAccessToken(user.email);
    const mapper = buildMapper(UserDto);
    const userDto = mapper.serialize(user);
    return res.send({
      accessToken,
      user: userDto,
    });
  }
}
