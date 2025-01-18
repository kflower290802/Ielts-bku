import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionRepository } from './infrastructure/persistence/subscription.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Subscription } from './domain/subscription';

@Injectable()
export class SubscriptionsService {
  constructor(
    // Dependencies here
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.subscriptionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ...createSubscriptionDto,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.subscriptionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Subscription['id']) {
    return this.subscriptionRepository.findById(id);
  }

  findByIds(ids: Subscription['id'][]) {
    return this.subscriptionRepository.findByIds(ids);
  }

  async update(
    id: Subscription['id'],
    updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.subscriptionRepository.update(id, {
      ...updateSubscriptionDto,
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Subscription['id']) {
    return this.subscriptionRepository.remove(id);
  }
}
