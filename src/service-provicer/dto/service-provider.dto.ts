import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateServiceProviderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  serviceProviderId: string;

  @ApiProperty()
  @IsNumber()
  valueMeter: number;

  @ApiProperty()
  @IsNumber()
  valueHour: number;

  @ApiProperty()
  @IsNumber()
  valueConvenient: number;
}

export class UpdateServiceProviderDto extends PartialType(CreateServiceProviderDto) {}

