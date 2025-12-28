import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignInResponseDto {
  access_token: string;
}
