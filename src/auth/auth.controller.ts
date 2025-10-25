import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { RefreshTokenDto } from './dto/RefreshTokenDto';
import { AuthLoginUserDto } from './dto/LoginUserDto';
import { JwtAuthGuard } from './guards';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiBody({
    type: RegisterUserDto,
    description: 'Register user',
    examples: {
      'Register user': {
        value: {
          email: 'test@example.com',
          password: 'Test123#',
          firstName: 'John',
          lastName: 'Doe',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 200,
    description: 'User registered successfully',
    schema: {
      type: 'object',
      properties: {
        authenticationResult: {
          type: 'object',
          properties: {
            idToken: { type: 'string' },
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
            expiresIn: { type: 'number' },
            tokenType: { type: 'string' },
          },
        },
      },
    },
  })
  signUp(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.signUpUser(registerUserDto);
  }

  @Post('/signin')
  @ApiBody({
    type: AuthLoginUserDto,
    description: 'Login user',
    examples: {
      'Login user': {
        value: {
          email: 'test@example.com',
          password: 'Test123#',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      type: 'object',
      properties: {
        authenticationResult: {
          type: 'object',
          properties: {
            idToken: { type: 'string' },
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
            expiresIn: { type: 'number' },
            tokenType: { type: 'string' },
          },
        },
      },
    },
  })
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
  async me(@Req() req: Request & { user: { email: string; userId: string } }) {
    return await this.authService.getMe(req.user.email);
  }

  @Post('/refresh')
  @ApiBody({
    type: RefreshTokenDto,
    description: 'Refresh token',
    examples: {
      'Refresh token': {
        value: {
          refreshToken: 'refreshToken',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    schema: {
      type: 'object',
      properties: {
        authenticationResult: {
          type: 'object',
          properties: {
            idToken: { type: 'string' },
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
            expiresIn: { type: 'number' },
            tokenType: { type: 'string' },
          },
        },
      },
    },
  })
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
