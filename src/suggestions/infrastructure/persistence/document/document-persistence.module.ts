import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  suggestionSchema,
  suggestionSchemaClass,
} from './entities/suggestion.schema';
import { suggestionRepository } from '../suggestion.repository';
import { suggestionDocumentRepository } from './repositories/suggestion.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: suggestionSchemaClass.name, schema: suggestionSchema },
    ]),
  ],
  providers: [
    {
      provide: suggestionRepository,
      useClass: suggestionDocumentRepository,
    },
  ],
  exports: [suggestionRepository],
})
export class DocumentsuggestionPersistenceModule {}
