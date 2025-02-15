import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { RoleEnum } from '../../accounts/infrastructure/persistence/document/entities/account.schema';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'khoa.tran', type: String })
  @IsOptional()
  @Transform(lowerCaseTransformer)
  username?: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123 Main St, Springfield, USA' })
  @IsOptional()
  address?: string;

  @ApiProperty({ example: '123456789' })
  @IsOptional()
  phone: string | null;

  @ApiProperty({ example: RoleEnum.Learner })
  @IsOptional()
  role?: RoleEnum;
}
