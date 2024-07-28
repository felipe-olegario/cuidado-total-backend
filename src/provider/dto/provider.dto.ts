import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, isInt } from 'class-validator';

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

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  document: string;

  addresses: CreateAddressDto[];
}

export class CreateAddressDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()

  street: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  number: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  latitude: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  logitude: string;
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

export class GetProvidersDto {
  @IsNotEmpty()
  @ApiProperty()
  latitude?: number;
  @IsNotEmpty()
  @ApiProperty()
  longitude?: number;
  @IsNotEmpty()
  @ApiProperty()
  address?: string;
  @IsNotEmpty()
  @ApiProperty()
  page?: number;
  @IsNotEmpty()
  @ApiProperty()
  limit?: number;
}
