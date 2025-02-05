import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  questionSchema,
  questionSchemaClass,
} from './entities/question.schema';
import { questionRepository } from '../question.repository';
import { questionDocumentRepository } from './repositories/question.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: questionSchemaClass.name, schema: questionSchema },
    ]),
  ],
  providers: [
    {
      provide: questionRepository,
      useClass: questionDocumentRepository,
    },
  ],
  exports: [questionRepository],
})
export class DocumentquestionPersistenceModule {}
