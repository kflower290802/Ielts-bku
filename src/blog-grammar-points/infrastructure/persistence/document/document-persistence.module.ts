import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BlogGrammarPointSchema,
  BlogGrammarPointSchemaClass,
} from './entities/blog-grammar-point.schema';
import { BlogGrammarPointRepository } from '../blog-grammar-point.repository';
import { BlogGrammarPointDocumentRepository } from './repositories/blog-grammar-point.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BlogGrammarPointSchemaClass.name,
        schema: BlogGrammarPointSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: BlogGrammarPointRepository,
      useClass: BlogGrammarPointDocumentRepository,
    },
  ],
  exports: [BlogGrammarPointRepository],
})
export class DocumentBlogGrammarPointPersistenceModule {}
