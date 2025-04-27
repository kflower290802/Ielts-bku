import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Subscription } from './domain/subscription';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Subscriptions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'subscriptions',
  version: '1',
})
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Subscription,
  })
  create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @Request() request,
  ) {
    const userId = request.user.id;
    return this.subscriptionsService.create({
      ...createSubscriptionDto,
      userId,
    });
  }

  @Get()
  @ApiOkResponse({
    type: Subscription,
  })
  findByUserId(@Request() request) {
    const userId = request.user.id;
    return this.subscriptionsService.findByUserId(userId);
  }
}
