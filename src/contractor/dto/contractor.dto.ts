import { IsString, IsEmail, IsNotEmpty, Length, IsUUID, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateContractorDto {
  @ApiProperty({ example: 'c23a29e0-31b8-4d5d-b7d9-4e7e4853a4bb', description: 'Unique identifier for the contractor' })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the contractor' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email of the contractor' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'Phone number of the contractor' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Main Street', description: 'Street address of the contractor' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: '123', description: 'Street number of the contractor' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ example: 'strongpassword123', description: 'Password for the contractor' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '12345-678', description: 'Postal code of the contractor' })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ example: '12345678901', description: 'Document number of the contractor', maxLength: 11 })
  @IsString()
  @Length(11, 11)
  document: string;

  @ApiProperty({ example: '2023-01-01T00:00:00Z', description: 'Creation date of the contractor', required: false })
  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00Z', description: 'Last update date of the contractor', required: false })
  @IsDateString()
  @IsOptional()
  updatedAt?: Date;
}

export class UpdateContractorDto extends PartialType(CreateContractorDto) {}
