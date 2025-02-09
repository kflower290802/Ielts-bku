import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { choiceSchema, ChoiceSchemaClass } from './entities/choice.schema';
import { ChoiceRepository } from '../choice.repository';
import { ChoiceDocumentRepository } from './repositories/choice.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChoiceSchemaClass.name, schema: choiceSchema },
    ]),
  ],
  providers: [
    {
      provide: ChoiceRepository,
      useClass: ChoiceDocumentRepository,
    },
  ],
  exports: [ChoiceRepository],
})
export class DocumentChoicePersistenceModule {}
