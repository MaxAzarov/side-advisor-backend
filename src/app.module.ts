import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        COGNITO_USER_POOL_APP_CLIENT_ID: Joi.string().required(),
        COGNITO_USER_POOL_ID: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        PORT: Joi.string().required(),
      }),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
