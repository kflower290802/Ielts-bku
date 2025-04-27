import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionPlan } from '../subscription.type';
import { User } from '../../users/domain/user';

export class Subscription {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  plan: SubscriptionPlan;

  @ApiProperty()
  user: User;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
