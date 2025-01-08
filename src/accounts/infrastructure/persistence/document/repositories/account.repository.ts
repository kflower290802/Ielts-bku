import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountSchemaClass } from '../entities/account.schema';
import { AccountRepository } from '../../account.repository';
import { Account } from '../../../../domain/account';
import { AccountMapper } from '../mappers/account.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class AccountDocumentRepository implements AccountRepository {
  constructor(
    @InjectModel(AccountSchemaClass.name)
    private readonly accountModel: Model<AccountSchemaClass>,
  ) {}

  async create(data: Account): Promise<Account> {
    const persistenceModel = AccountMapper.toPersistence(data);
    const createdEntity = new this.accountModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return AccountMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Account[]> {
    const entityObjects = await this.accountModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      AccountMapper.toDomain(entityObject),
    );
  }

  async findById(id: Account['id']): Promise<NullableType<Account>> {
    const entityObject = await this.accountModel.findById(id);
    return entityObject ? AccountMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Account['id'][]): Promise<Account[]> {
    const entityObjects = await this.accountModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      AccountMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Account['id'],
    payload: Partial<Account>,
  ): Promise<NullableType<Account>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.accountModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.accountModel.findOneAndUpdate(
      filter,
      AccountMapper.toPersistence({
        ...AccountMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? AccountMapper.toDomain(entityObject) : null;
  }

  async remove(id: Account['id']): Promise<void> {
    await this.accountModel.deleteOne({ _id: id });
  }

  async findByUsername(
    username: Account['username'],
  ): Promise<NullableType<Account>> {
    const account = await this.accountModel.findOne({ username });
    return account ? AccountMapper.toDomain(account) : null;
  }

  async findByAccountId(
    accountId: Account['id'],
  ): Promise<NullableType<Account>> {
    const account = await this.accountModel.findOne({ account: accountId });
    return account ? AccountMapper.toDomain(account) : null;
  }
}
