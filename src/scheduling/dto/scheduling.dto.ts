import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateSchedulingDto {
  @IsNotEmpty()
  @IsString()
  serviceProviderId: string;

  @IsNotEmpty()
  @IsString()
  contractorId: string;

  @IsNotEmpty()
  @IsString()
  serviceId: string;

  @IsNotEmpty()
  @IsDateString()
  scheduledDate: string;

  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @IsNotEmpty()
  @IsDateString()
  endTime: string;
}

export class UpdateSchedulingDto extends PartialType(CreateSchedulingDto) {}

export class SchedulingResponseDto {
  @IsString()
  id: string;

  @IsString()
  serviceProviderId: string;

  @IsString()
  contractorId: string;

  @IsString()
  serviceId: string;

  @IsDateString()
  scheduledDate: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
