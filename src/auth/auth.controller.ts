import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { GetMeDto } from './dto/GetMeDto';
import { RefreshTokenDto } from './dto/RefreshTokenDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.signUpUser(registerUserDto);
  }

  @Post('/signin')
  signIn(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.signInUser(registerUserDto);
  }

  @Get('/me')
  me(@Body() getMeDto: GetMeDto) {
    return this.authService.getMe(getMeDto);
  }

  @Post('/refresh')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
