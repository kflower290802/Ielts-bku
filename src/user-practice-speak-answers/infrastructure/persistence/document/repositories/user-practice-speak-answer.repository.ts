import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPracticeSpeakAnswerSchemaClass } from '../entities/user-practice-speak-answer.schema';
import { UserPracticeSpeakAnswerRepository } from '../../user-practice-speak-answer.repository';
import { UserPracticeSpeakAnswer } from '../../../../domain/user-practice-speak-answer';
import { UserPracticeSpeakAnswerMapper } from '../mappers/user-practice-speak-answer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UserPracticeSpeakAnswerDocumentRepository
  implements UserPracticeSpeakAnswerRepository
{
  constructor(
    @InjectModel(UserPracticeSpeakAnswerSchemaClass.name)
    private readonly userPracticeSpeakAnswerModel: Model<UserPracticeSpeakAnswerSchemaClass>,
  ) {}

  async create(
    data: UserPracticeSpeakAnswer,
  ): Promise<UserPracticeSpeakAnswer> {
    const persistenceModel = UserPracticeSpeakAnswerMapper.toPersistence(data);
    const createdEntity = new this.userPracticeSpeakAnswerModel(
      persistenceModel,
    );
    const entityObject = await createdEntity.save();
    return UserPracticeSpeakAnswerMapper.toDomain(entityObject);
  }

  async createMany(
    data: UserPracticeSpeakAnswer[],
  ): Promise<UserPracticeSpeakAnswer[]> {
    const persistenceModels = data.map((item) =>
      UserPracticeSpeakAnswerMapper.toPersistence(item),
    );
    const createdEntities =
      await this.userPracticeSpeakAnswerModel.insertMany(persistenceModels);
    return createdEntities.map(UserPracticeSpeakAnswerMapper.toDomain);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPracticeSpeakAnswer[]> {
    const entityObjects = await this.userPracticeSpeakAnswerModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserPracticeSpeakAnswerMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: UserPracticeSpeakAnswer['id'],
  ): Promise<NullableType<UserPracticeSpeakAnswer>> {
    const entityObject = await this.userPracticeSpeakAnswerModel.findById(id);
    return entityObject
      ? UserPracticeSpeakAnswerMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: UserPracticeSpeakAnswer['id'][],
  ): Promise<UserPracticeSpeakAnswer[]> {
    const entityObjects = await this.userPracticeSpeakAnswerModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      UserPracticeSpeakAnswerMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserPracticeSpeakAnswer['id'],
    payload: Partial<UserPracticeSpeakAnswer>,
  ): Promise<NullableType<UserPracticeSpeakAnswer>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userPracticeSpeakAnswerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject =
      await this.userPracticeSpeakAnswerModel.findOneAndUpdate(
        filter,
        UserPracticeSpeakAnswerMapper.toPersistence({
          ...UserPracticeSpeakAnswerMapper.toDomain(entity),
          ...clonedPayload,
        }),
        { new: true },
      );

    return entityObject
      ? UserPracticeSpeakAnswerMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: UserPracticeSpeakAnswer['id']): Promise<void> {
    await this.userPracticeSpeakAnswerModel.deleteOne({ _id: id });
  }

  async findByUserPractice(id: string): Promise<UserPracticeSpeakAnswer[]> {
    const entityObjects = await this.userPracticeSpeakAnswerModel
      .find({
        userPractice: {
          _id: id,
        },
      })
      .sort({ updatedAt: -1 });
    return entityObjects.map(UserPracticeSpeakAnswerMapper.toDomain);
  }
}
