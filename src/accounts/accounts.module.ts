import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { DocumentAccountPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentAccountPersistenceModule],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService, DocumentAccountPersistenceModule],
})
export class AccountsModule {}
