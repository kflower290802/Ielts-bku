import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPracticeListenAnswerSchemaClass } from '../entities/user-practice-listen-answer.schema';
import { UserPracticeListenAnswerRepository } from '../../user-practice-listen-answer.repository';
import { UserPracticeListenAnswer } from '../../../../domain/user-practice-listen-answer';
import { UserPracticeListenAnswerMapper } from '../mappers/user-practice-listen-answer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UserPracticeListenAnswerDocumentRepository
  implements UserPracticeListenAnswerRepository
{
  constructor(
    @InjectModel(UserPracticeListenAnswerSchemaClass.name)
    private readonly userPracticeListenAnswerModel: Model<UserPracticeListenAnswerSchemaClass>,
  ) {}

  async create(
    data: UserPracticeListenAnswer,
  ): Promise<UserPracticeListenAnswer> {
    const persistenceModel = UserPracticeListenAnswerMapper.toPersistence(data);
    const createdEntity = new this.userPracticeListenAnswerModel(
      persistenceModel,
    );
    const entityObject = await createdEntity.save();
    return UserPracticeListenAnswerMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPracticeListenAnswer[]> {
    const entityObjects = await this.userPracticeListenAnswerModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserPracticeListenAnswerMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: UserPracticeListenAnswer['id'],
  ): Promise<NullableType<UserPracticeListenAnswer>> {
    const entityObject = await this.userPracticeListenAnswerModel.findById(id);
    return entityObject
      ? UserPracticeListenAnswerMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: UserPracticeListenAnswer['id'][],
  ): Promise<UserPracticeListenAnswer[]> {
    const entityObjects = await this.userPracticeListenAnswerModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      UserPracticeListenAnswerMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserPracticeListenAnswer['id'],
    payload: Partial<UserPracticeListenAnswer>,
  ): Promise<NullableType<UserPracticeListenAnswer>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userPracticeListenAnswerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject =
      await this.userPracticeListenAnswerModel.findOneAndUpdate(
        filter,
        UserPracticeListenAnswerMapper.toPersistence({
          ...UserPracticeListenAnswerMapper.toDomain(entity),
          ...clonedPayload,
        }),
        { new: true },
      );

    return entityObject
      ? UserPracticeListenAnswerMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: UserPracticeListenAnswer['id']): Promise<void> {
    await this.userPracticeListenAnswerModel.deleteOne({ _id: id });
  }

  async createMany(
    data: UserPracticeListenAnswer[],
  ): Promise<UserPracticeListenAnswer[]> {
    const persistenceModels = data.map(
      UserPracticeListenAnswerMapper.toPersistence,
    );
    const entities =
      await this.userPracticeListenAnswerModel.insertMany(persistenceModels);
    return entities.map(UserPracticeListenAnswerMapper.toDomain);
  }

  async findByUserPractice(id: string): Promise<UserPracticeListenAnswer[]> {
    const userPractices = await this.userPracticeListenAnswerModel
      .find({
        userPractice: {
          _id: id,
        },
      })
      .populate('question');
    return userPractices.map(UserPracticeListenAnswerMapper.toDomain);
  }
}
