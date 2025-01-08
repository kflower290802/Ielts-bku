import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateAccountDto {
  @ApiProperty({ example: 'huy.phan' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'P@ssw0rd123' })
  @IsNotEmpty()
  password: string;
}
