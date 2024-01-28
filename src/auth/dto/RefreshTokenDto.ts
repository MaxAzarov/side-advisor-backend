import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User`s refresh token',
  })
  refreshToken: string;
}
