import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PageVisitSchema,
  PageVisitSchemaClass,
} from './entities/page-visit.schema';
import { PageVisitRepository } from '../page-visit.repository';
import { PageVisitDocumentRepository } from './repositories/page-visit.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PageVisitSchemaClass.name, schema: PageVisitSchema },
    ]),
  ],
  providers: [
    {
      provide: PageVisitRepository,
      useClass: PageVisitDocumentRepository,
    },
  ],
  exports: [PageVisitRepository],
})
export class DocumentPageVisitPersistenceModule {}
