import { forwardRef, Module } from '@nestjs/common';
import { PracticeReadingTypesService } from './practice-reading-types.service';
import { PracticeReadingTypesController } from './practice-reading-types.controller';
import { DocumentPracticeReadingTypePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { PracticeReadingsModule } from '../practice-readings/practice-readings.module';
import { PracticeReadingQuestionsModule } from '../practice-reading-questions/practice-reading-questions.module';

@Module({
  imports: [
    DocumentPracticeReadingTypePersistenceModule,
    forwardRef(() => PracticeReadingsModule),
    forwardRef(() => PracticeReadingQuestionsModule),
  ],
  controllers: [PracticeReadingTypesController],
  providers: [PracticeReadingTypesService],
  exports: [
    PracticeReadingTypesService,
    DocumentPracticeReadingTypePersistenceModule,
  ],
})
export class PracticeReadingTypesModule {}
