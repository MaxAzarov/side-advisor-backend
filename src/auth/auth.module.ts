import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CognitoJwtStrategy } from './strategy/cognito.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CognitoJwtStrategy],
})
export class AuthModule {}
