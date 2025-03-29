import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../infrastructure/persistence/document/entities/user.schema';
import { Account } from '../../accounts/domain/account';

export class User {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Expose({ groups: ['me', 'admin'] })
  email: string;

  @ApiProperty({
    type: String,
    example: 'John',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: '123 Main St, Springfield, USA',
    required: false,
  })
  address?: string;

  @ApiProperty()
  account: Account;

  @ApiProperty()
  phone: string | null;

  @ApiProperty()
  target?: number;

  @ApiProperty()
  status: StatusEnum;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
