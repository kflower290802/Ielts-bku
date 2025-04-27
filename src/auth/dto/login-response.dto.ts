import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { SubscriptionPlan } from '../../subscriptions/subscription.type';
export class LoginResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  tokenExpires: number;

  @ApiProperty({
    type: () => User,
  })
  user: User;

  @ApiProperty({
    type: String,
  })
  subscription?: SubscriptionPlan;
}
