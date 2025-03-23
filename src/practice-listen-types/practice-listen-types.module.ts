import { Module } from '@nestjs/common';
import { PracticeListenTypesService } from './practice-listen-types.service';
import { PracticeListenTypesController } from './practice-listen-types.controller';
import { DocumentPracticeListenTypePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { PracticeListenQuestionsModule } from '../practice-listen-questions/practice-listen-questions.module';

@Module({
  imports: [
    DocumentPracticeListenTypePersistenceModule,
    PracticeListenQuestionsModule,
  ],
  controllers: [PracticeListenTypesController],
  providers: [PracticeListenTypesService],
  exports: [
    PracticeListenTypesService,
    DocumentPracticeListenTypePersistenceModule,
  ],
})
export class PracticeListenTypesModule {}
