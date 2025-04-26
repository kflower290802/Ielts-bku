import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePageVisitDto {
  @ApiProperty()
  @IsOptional()
  url: string;

  @ApiProperty()
  @IsOptional()
  userId: string;

  @ApiProperty()
  @IsOptional()
  deviceType: string;

  @ApiProperty()
  @IsOptional()
  browser: string;

  @ApiProperty()
  @IsOptional()
  os: string;
}
