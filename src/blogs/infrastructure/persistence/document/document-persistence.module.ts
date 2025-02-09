import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema, BlogSchemaClass } from './entities/blog.schema';
import { BlogRepository } from '../blog.repository';
import { BlogDocumentRepository } from './repositories/blog.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogSchemaClass.name, schema: BlogSchema },
    ]),
  ],
  providers: [
    {
      provide: BlogRepository,
      useClass: BlogDocumentRepository,
    },
  ],
  exports: [BlogRepository],
})
export class DocumentBlogPersistenceModule {}
