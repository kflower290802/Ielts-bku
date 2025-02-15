import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'khoa.tran@gmail.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd123' })
  @IsNotEmpty()
  password: string;
}
