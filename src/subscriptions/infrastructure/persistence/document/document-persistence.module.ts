import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubscriptionSchema,
  SubscriptionSchemaClass,
} from './entities/subscription.schema';
import { SubscriptionRepository } from '../subscription.repository';
import { SubscriptionDocumentRepository } from './repositories/subscription.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriptionSchemaClass.name, schema: SubscriptionSchema },
    ]),
  ],
  providers: [
    {
      provide: SubscriptionRepository,
      useClass: SubscriptionDocumentRepository,
    },
  ],
  exports: [SubscriptionRepository],
})
export class DocumentSubscriptionPersistenceModule {}
