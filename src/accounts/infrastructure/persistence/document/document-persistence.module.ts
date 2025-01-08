import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema, AccountSchemaClass } from './entities/account.schema';
import { AccountRepository } from '../account.repository';
import { AccountDocumentRepository } from './repositories/account.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountSchemaClass.name, schema: AccountSchema },
    ]),
  ],
  providers: [
    {
      provide: AccountRepository,
      useClass: AccountDocumentRepository,
    },
  ],
  exports: [AccountRepository],
})
export class DocumentAccountPersistenceModule {}
