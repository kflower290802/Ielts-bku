import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserExamListenAnswerSchemaClass } from '../entities/user-exam-listen-answer.schema';
import { UserExamListenAnswerRepository } from '../../user-exam-listen-answer.repository';
import { UserExamListenAnswer } from '../../../../domain/user-exam-listen-answer';
import { UserExamListenAnswerMapper } from '../mappers/user-exam-listen-answer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UserExamListenAnswerDocumentRepository
  implements UserExamListenAnswerRepository
{
  constructor(
    @InjectModel(UserExamListenAnswerSchemaClass.name)
    private readonly userExamListenAnswerModel: Model<UserExamListenAnswerSchemaClass>,
  ) {}

  async create(data: UserExamListenAnswer): Promise<UserExamListenAnswer> {
    const persistenceModel = UserExamListenAnswerMapper.toPersistence(data);
    const createdEntity = new this.userExamListenAnswerModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return UserExamListenAnswerMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExamListenAnswer[]> {
    const entityObjects = await this.userExamListenAnswerModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserExamListenAnswerMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: UserExamListenAnswer['id'],
  ): Promise<NullableType<UserExamListenAnswer>> {
    const entityObject = await this.userExamListenAnswerModel.findById(id);
    return entityObject
      ? UserExamListenAnswerMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: UserExamListenAnswer['id'][],
  ): Promise<UserExamListenAnswer[]> {
    const entityObjects = await this.userExamListenAnswerModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      UserExamListenAnswerMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserExamListenAnswer['id'],
    payload: Partial<UserExamListenAnswer>,
  ): Promise<NullableType<UserExamListenAnswer>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userExamListenAnswerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.userExamListenAnswerModel.findOneAndUpdate(
      filter,
      UserExamListenAnswerMapper.toPersistence({
        ...UserExamListenAnswerMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject
      ? UserExamListenAnswerMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: UserExamListenAnswer['id']): Promise<void> {
    await this.userExamListenAnswerModel.deleteOne({ _id: id });
  }
  async findByUserExamId(userExamId: string): Promise<UserExamListenAnswer[]> {
    const entityObjects = await this.userExamListenAnswerModel.find({
      userExam: {
        _id: userExamId,
      },
    });
    return entityObjects.map(UserExamListenAnswerMapper.toDomain);
  }

  async findByQuestionId(
    questionId: string,
  ): Promise<NullableType<UserExamListenAnswer>> {
    const entity = await this.userExamListenAnswerModel.findOne({
      examPassageQuestion: {
        _id: questionId,
      },
    });
    return entity ? UserExamListenAnswerMapper.toDomain(entity) : null;
  }

  async findByUserExamIdAndExamPassageQuestionId(
    userExamId: string,
    examPassageQuestionId: string,
  ): Promise<NullableType<UserExamListenAnswer>> {
    const entity = await this.userExamListenAnswerModel.findOne({
      userExam: {
        _id: userExamId,
      },
      examPassageQuestion: {
        _id: examPassageQuestionId,
      },
    });
    return entity ? UserExamListenAnswerMapper.toDomain(entity) : null;
  }
}
