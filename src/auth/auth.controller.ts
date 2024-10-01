import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { RefreshTokenDto } from './dto/RefreshTokenDto';
import { AuthLoginUserDto } from './dto/LoginUserDto';
import { JwtAuthGuard } from './guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.signUpUser(registerUserDto);
  }

  @Post('/signin')
  signIn(@Body() registerUserDto: AuthLoginUserDto) {
    return this.authService.signInUser(registerUserDto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get authenticated user info' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access.',
  })
  async me(@Req() req: Request & { user: { email: string } }) {
    return await this.authService.getMe(req.user.email);
  }

  @Post('/refresh')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
