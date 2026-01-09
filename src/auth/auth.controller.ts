import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { type RequestWithUser } from 'src/common/IJwtPayload';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() login: LoginDto) {
    const user = await this.AuthService.validateUser(
      login.email,
      login.password,
    );
    if (!user) throw new UnauthorizedException();
    return this.AuthService.login(user);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  profile(@Request() req: RequestWithUser) {
    return req.user;
  }
}
