import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionRepository } from './infrastructure/persistence/subscription.repository';
import { Subscription } from './domain/subscription';
import { User } from '../users/domain/user';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const { userId, ...rest } = createSubscriptionDto;
    const user = new User();
    user.id = userId;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    return this.subscriptionRepository.create({
      ...rest,
      user,
      startDate,
      endDate,
    });
  }

  findByUserId(userId: string) {
    return this.subscriptionRepository.findByUserId(userId);
  }

  findById(id: Subscription['id']) {
    return this.subscriptionRepository.findById(id);
  }

  findByIds(ids: Subscription['id'][]) {
    return this.subscriptionRepository.findByIds(ids);
  }

  remove(id: Subscription['id']) {
    return this.subscriptionRepository.remove(id);
  }
}
