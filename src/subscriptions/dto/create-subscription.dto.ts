import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SubscriptionPlan } from '../subscription.type';
export class CreateSubscriptionDto {
  userId: string;

  @ApiProperty({ example: SubscriptionPlan.Plus, enum: SubscriptionPlan })
  @IsNotEmpty()
  plan: SubscriptionPlan;
}
