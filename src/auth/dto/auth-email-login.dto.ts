import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'khoa.tran', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'P@ssw0rd123' })
  @IsNotEmpty()
  password: string;
}
