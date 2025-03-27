import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPracticeWritingAnswerSchemaClass } from '../entities/user-practice-writing-answer.schema';
import { UserPracticeWritingAnswerRepository } from '../../user-practice-writing-answer.repository';
import { UserPracticeWritingAnswer } from '../../../../domain/user-practice-writing-answer';
import { UserPracticeWritingAnswerMapper } from '../mappers/user-practice-writing-answer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UserPracticeWritingAnswerDocumentRepository
  implements UserPracticeWritingAnswerRepository
{
  constructor(
    @InjectModel(UserPracticeWritingAnswerSchemaClass.name)
    private readonly userPracticeWritingAnswerModel: Model<UserPracticeWritingAnswerSchemaClass>,
  ) {}

  async create(
    data: UserPracticeWritingAnswer,
  ): Promise<UserPracticeWritingAnswer> {
    const persistenceModel =
      UserPracticeWritingAnswerMapper.toPersistence(data);
    const createdEntity = new this.userPracticeWritingAnswerModel(
      persistenceModel,
    );
    const entityObject = await createdEntity.save();
    return UserPracticeWritingAnswerMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPracticeWritingAnswer[]> {
    const entityObjects = await this.userPracticeWritingAnswerModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserPracticeWritingAnswerMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: UserPracticeWritingAnswer['id'],
  ): Promise<NullableType<UserPracticeWritingAnswer>> {
    const entityObject = await this.userPracticeWritingAnswerModel.findById(id);
    return entityObject
      ? UserPracticeWritingAnswerMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: UserPracticeWritingAnswer['id'][],
  ): Promise<UserPracticeWritingAnswer[]> {
    const entityObjects = await this.userPracticeWritingAnswerModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      UserPracticeWritingAnswerMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserPracticeWritingAnswer['id'],
    payload: Partial<UserPracticeWritingAnswer>,
  ): Promise<NullableType<UserPracticeWritingAnswer>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userPracticeWritingAnswerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject =
      await this.userPracticeWritingAnswerModel.findOneAndUpdate(
        filter,
        UserPracticeWritingAnswerMapper.toPersistence({
          ...UserPracticeWritingAnswerMapper.toDomain(entity),
          ...clonedPayload,
        }),
        { new: true },
      );

    return entityObject
      ? UserPracticeWritingAnswerMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: UserPracticeWritingAnswer['id']): Promise<void> {
    await this.userPracticeWritingAnswerModel.deleteOne({ _id: id });
  }

  async finByUserPracticeId(
    id: string,
  ): Promise<NullableType<UserPracticeWritingAnswer>> {
    const answer = await this.userPracticeWritingAnswerModel.findOne({
      userPractice: {
        _id: id,
      },
    });
    return answer ? UserPracticeWritingAnswerMapper.toDomain(answer) : null;
  }
}
