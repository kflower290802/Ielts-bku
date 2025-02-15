import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateAccountDto {
  @ApiProperty({ example: 'khoa.tran' })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  username?: string;

  @ApiProperty({ example: 'P@ssw0rd123' })
  @IsNotEmpty()
  password: string;
}
