import { Module } from '@nestjs/common';
import { UserPracticesService } from './user-practices.service';
import { UserPracticesController } from './user-practices.controller';
import { DocumentUserPracticePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentUserPracticePersistenceModule],
  controllers: [UserPracticesController],
  providers: [UserPracticesService],
  exports: [UserPracticesService, DocumentUserPracticePersistenceModule],
})
export class UserPracticesModule {}
