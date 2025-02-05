import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  scheduleSchema,
  scheduleSchemaClass,
} from './entities/schedule.schema';
import { scheduleRepository } from '../schedule.repository';
import { scheduleDocumentRepository } from './repositories/schedule.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: scheduleSchemaClass.name, schema: scheduleSchema },
    ]),
  ],
  providers: [
    {
      provide: scheduleRepository,
      useClass: scheduleDocumentRepository,
    },
  ],
  exports: [scheduleRepository],
})
export class DocumentschedulePersistenceModule {}
