import { forwardRef, Module } from '@nestjs/common';
import { FlashCardsService } from './flash-cards.service';
import { FlashCardsController } from './flash-cards.controller';
import { DocumentFlashCardPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { LessonModule } from '../lessons/lessons.module';

@Module({
  imports: [DocumentFlashCardPersistenceModule, forwardRef(() => LessonModule)],
  controllers: [FlashCardsController],
  providers: [FlashCardsService],
  exports: [FlashCardsService, DocumentFlashCardPersistenceModule],
})
export class FlashCardsModule {}
