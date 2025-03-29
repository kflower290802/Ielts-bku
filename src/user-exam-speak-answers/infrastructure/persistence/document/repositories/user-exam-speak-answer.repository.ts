import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserExamSpeakAnswerSchemaClass } from '../entities/user-exam-speak-answer.schema';
import { UserExamSpeakAnswerRepository } from '../../user-exam-speak-answer.repository';
import { UserExamSpeakAnswer } from '../../../../domain/user-exam-speak-answer';
import { UserExamSpeakAnswerMapper } from '../mappers/user-exam-speak-answer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UserExamSpeakAnswerDocumentRepository
  implements UserExamSpeakAnswerRepository
{
  constructor(
    @InjectModel(UserExamSpeakAnswerSchemaClass.name)
    private readonly userExamSpeakAnswerModel: Model<UserExamSpeakAnswerSchemaClass>,
  ) {}

  async create(data: UserExamSpeakAnswer): Promise<UserExamSpeakAnswer> {
    const persistenceModel = UserExamSpeakAnswerMapper.toPersistence(data);
    const createdEntity = new this.userExamSpeakAnswerModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return UserExamSpeakAnswerMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExamSpeakAnswer[]> {
    const entityObjects = await this.userExamSpeakAnswerModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserExamSpeakAnswerMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: UserExamSpeakAnswer['id'],
  ): Promise<NullableType<UserExamSpeakAnswer>> {
    const entityObject = await this.userExamSpeakAnswerModel.findById(id);
    return entityObject
      ? UserExamSpeakAnswerMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: UserExamSpeakAnswer['id'][],
  ): Promise<UserExamSpeakAnswer[]> {
    const entityObjects = await this.userExamSpeakAnswerModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      UserExamSpeakAnswerMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserExamSpeakAnswer['id'],
    payload: Partial<UserExamSpeakAnswer>,
  ): Promise<NullableType<UserExamSpeakAnswer>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userExamSpeakAnswerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.userExamSpeakAnswerModel.findOneAndUpdate(
      filter,
      UserExamSpeakAnswerMapper.toPersistence({
        ...UserExamSpeakAnswerMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject
      ? UserExamSpeakAnswerMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: UserExamSpeakAnswer['id']): Promise<void> {
    await this.userExamSpeakAnswerModel.deleteOne({ _id: id });
  }
  async findByQuestionIdAndUserExamId(
    userExamId: string,
    questionId: string,
  ): Promise<NullableType<UserExamSpeakAnswer>> {
    const entity = await this.userExamSpeakAnswerModel.findOne({
      userExamId,
      questionId,
    });
    return entity ? UserExamSpeakAnswerMapper.toDomain(entity) : null;
  }
  async findByUserExamId(userExamId: string): Promise<UserExamSpeakAnswer[]> {
    const entities = await this.userExamSpeakAnswerModel.find({
      userExam: {
        _id: userExamId,
      },
    });
    return entities.map(UserExamSpeakAnswerMapper.toDomain);
  }
  async createMany(
    data: UserExamSpeakAnswer[],
  ): Promise<UserExamSpeakAnswer[]> {
    const persistenceModels = data.map(UserExamSpeakAnswerMapper.toPersistence);
    const createdEntities =
      await this.userExamSpeakAnswerModel.insertMany(persistenceModels);
    return createdEntities.map(UserExamSpeakAnswerMapper.toDomain);
  }
}
