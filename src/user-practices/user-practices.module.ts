import { Module } from '@nestjs/common';
import { UserPracticesService } from './user-practices.service';
import { UserPracticesController } from './user-practices.controller';
import { DocumentUserPracticePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UserPracticeSessionsModule } from '../user-practice-sessions/user-practice-sessions.module';
import { forwardRef } from '@nestjs/common';
@Module({
  imports: [
    DocumentUserPracticePersistenceModule,
    forwardRef(() => UserPracticeSessionsModule),
  ],
  controllers: [UserPracticesController],
  providers: [UserPracticesService],
  exports: [UserPracticesService, DocumentUserPracticePersistenceModule],
})
export class UserPracticesModule {}
