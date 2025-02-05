import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { choiceSchema, choiceSchemaClass } from './entities/choice.schema';
import { choiceRepository } from '../choice.repository';
import { choiceDocumentRepository } from './repositories/choice.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: choiceSchemaClass.name, schema: choiceSchema },
    ]),
  ],
  providers: [
    {
      provide: choiceRepository,
      useClass: choiceDocumentRepository,
    },
  ],
  exports: [choiceRepository],
})
export class DocumentchoicePersistenceModule {}
