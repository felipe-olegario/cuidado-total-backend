import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  number: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  document: string;
}

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
