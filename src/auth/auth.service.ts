import { AuthLoginUserDto } from './dto/LoginUserDto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as aws from 'aws-sdk';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { RefreshTokenDto } from './dto/RefreshTokenDto';

@Injectable()
export class AuthService {
  private cognitoIdentity: aws.CognitoIdentityServiceProvider;

  constructor(private readonly configService: ConfigService) {
    this.cognitoIdentity = new aws.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18',
      region: this.configService.get('AWS_REGION'),
    });
  }

  async signUpUser(registerUser: RegisterUserDto) {
    const { email, password, firstName, lastName } = registerUser;

    const clientId = this.configService.get<string>(
      'COGNITO_USER_POOL_APP_CLIENT_ID',
    );
    const userPoolId = this.configService.get<string>('COGNITO_USER_POOL_ID');

    await this.cognitoIdentity
      .signUp({
        ClientId: clientId,
        Password: password,
        Username: email,
        UserAttributes: [
          { Name: 'custom:first_name', Value: firstName },
          { Name: 'custom:last_name', Value: lastName },
        ],
      })
      .promise();

    await this.cognitoIdentity
      .adminConfirmSignUp({
        Username: email,
        UserPoolId: userPoolId,
      })
      .promise();

    return this.signInUser({ email, password });
  }

  async signInUser(authLogin: AuthLoginUserDto) {
    const clientId = this.configService.get<string>(
      'COGNITO_USER_POOL_APP_CLIENT_ID',
    );

    const { email, password } = authLogin;
    const params: aws.CognitoIdentityServiceProvider.Types.InitiateAuthRequest =
      {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      };

    const response = await this.cognitoIdentity.initiateAuth(params).promise();

    if (!response.AuthenticationResult) {
      throw new Error('Can not login');
    }

    const { AccessToken, ExpiresIn, IdToken, RefreshToken, TokenType } =
      response.AuthenticationResult;

    return {
      authenticationResult: {
        idToken: IdToken,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
        expiresIn: ExpiresIn,
        tokenType: TokenType,
      },
    };
  }

  async getMe(email?: string) {
    if (!email) {
      throw new BadRequestException('Email is not provided.');
    }

    const userPoolId = this.configService.get<string>('COGNITO_USER_POOL_ID');

    return await this.cognitoIdentity
      .adminGetUser({
        UserPoolId: userPoolId,
        Username: email,
      })
      .promise();
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const clientId = this.configService.get<string>(
      'COGNITO_USER_POOL_APP_CLIENT_ID',
    );

    const { refreshToken } = refreshTokenDto;

    const params: aws.CognitoIdentityServiceProvider.Types.InitiateAuthRequest =
      {
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: clientId,
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      };

    const response = await this.cognitoIdentity.initiateAuth(params).promise();

    if (!response.AuthenticationResult) {
      throw new Error('Can not login');
    }

    // https://github.com/aws/aws-sdk/issues/454
    // https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-refresh-token.html
    const { AccessToken, ExpiresIn, IdToken, TokenType } =
      response.AuthenticationResult;

    return {
      authenticationResult: {
        idToken: IdToken,
        accessToken: AccessToken,
        refreshToken: refreshToken,
        expiresIn: ExpiresIn,
        tokenType: TokenType,
      },
    };
  }
}
