import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { learnerSchema, learnerSchemaClass } from './entities/learner.schema';
import { learnerRepository } from '../learner.repository';
import { learnerDocumentRepository } from './repositories/learner.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: learnerSchemaClass.name, schema: learnerSchema },
    ]),
  ],
  providers: [
    {
      provide: learnerRepository,
      useClass: learnerDocumentRepository,
    },
  ],
  exports: [learnerRepository],
})
export class DocumentlearnerPersistenceModule {}
