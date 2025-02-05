import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { noteSchema, noteSchemaClass } from './entities/note.schema';
import { noteRepository } from '../note.repository';
import { noteDocumentRepository } from './repositories/note.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: noteSchemaClass.name, schema: noteSchema },
    ]),
  ],
  providers: [
    {
      provide: noteRepository,
      useClass: noteDocumentRepository,
    },
  ],
  exports: [noteRepository],
})
export class DocumentnotePersistenceModule {}
