import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FlashCardSchema,
  FlashCardSchemaClass,
} from './entities/flash-card.schema';
import { FlashCardRepository } from '../flash-card.repository';
import { FlashCardDocumentRepository } from './repositories/flash-card.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FlashCardSchemaClass.name, schema: FlashCardSchema },
    ]),
  ],
  providers: [
    {
      provide: FlashCardRepository,
      useClass: FlashCardDocumentRepository,
    },
  ],
  exports: [FlashCardRepository],
})
export class DocumentFlashCardPersistenceModule {}
