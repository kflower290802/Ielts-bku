import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPracticeReadingAnswerSchemaClass } from '../entities/user-practice-reading-answer.schema';
import { UserPracticeReadingAnswerRepository } from '../../user-practice-reading-answer.repository';
import { UserPracticeReadingAnswer } from '../../../../domain/user-practice-reading-answer';
import { UserPracticeReadingAnswerMapper } from '../mappers/user-practice-reading-answer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UserPracticeReadingAnswerDocumentRepository
  implements UserPracticeReadingAnswerRepository
{
  constructor(
    @InjectModel(UserPracticeReadingAnswerSchemaClass.name)
    private readonly userPracticeReadingAnswerModel: Model<UserPracticeReadingAnswerSchemaClass>,
  ) {}

  async create(
    data: UserPracticeReadingAnswer,
  ): Promise<UserPracticeReadingAnswer> {
    const persistenceModel =
      UserPracticeReadingAnswerMapper.toPersistence(data);
    const createdEntity = new this.userPracticeReadingAnswerModel(
      persistenceModel,
    );
    const entityObject = await createdEntity.save();
    return UserPracticeReadingAnswerMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPracticeReadingAnswer[]> {
    const entityObjects = await this.userPracticeReadingAnswerModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserPracticeReadingAnswerMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: UserPracticeReadingAnswer['id'],
  ): Promise<NullableType<UserPracticeReadingAnswer>> {
    const entityObject = await this.userPracticeReadingAnswerModel.findById(id);
    return entityObject
      ? UserPracticeReadingAnswerMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: UserPracticeReadingAnswer['id'][],
  ): Promise<UserPracticeReadingAnswer[]> {
    const entityObjects = await this.userPracticeReadingAnswerModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      UserPracticeReadingAnswerMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserPracticeReadingAnswer['id'],
    payload: Partial<UserPracticeReadingAnswer>,
  ): Promise<NullableType<UserPracticeReadingAnswer>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;
    console.log({id})
    const filter = { _id: id.toString() };
    const entity = await this.userPracticeReadingAnswerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject =
      await this.userPracticeReadingAnswerModel.findOneAndUpdate(
        filter,
        UserPracticeReadingAnswerMapper.toPersistence({
          ...UserPracticeReadingAnswerMapper.toDomain(entity),
          ...clonedPayload,
        }),
        { new: true },
      );

    return entityObject
      ? UserPracticeReadingAnswerMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: UserPracticeReadingAnswer['id']): Promise<void> {
    await this.userPracticeReadingAnswerModel.deleteOne({ _id: id });
  }
  async createMany(
    data: UserPracticeReadingAnswer[],
  ): Promise<UserPracticeReadingAnswer[]> {
    const persistenceModels = data.map(
      UserPracticeReadingAnswerMapper.toPersistence,
    );
    const entities =
      await this.userPracticeReadingAnswerModel.insertMany(persistenceModels);
    return entities.map(UserPracticeReadingAnswerMapper.toDomain);
  }

  async findByUserPractice(id: string): Promise<UserPracticeReadingAnswer[]> {
    const userPractices = await this.userPracticeReadingAnswerModel
      .find({
        userPractice: {
          _id: id,
        },
      })
      .populate('question');
    return userPractices.map(UserPracticeReadingAnswerMapper.toDomain);
  }
}
