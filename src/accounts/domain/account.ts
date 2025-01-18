import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../infrastructure/persistence/document/entities/account.schema';
import { Subscription } from '../../subscriptions/domain/subscription';

export class Account {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: RoleEnum;

  @ApiProperty()
  subscriptions: Subscription[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
