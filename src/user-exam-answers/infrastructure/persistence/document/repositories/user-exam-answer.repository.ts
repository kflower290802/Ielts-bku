import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserExamAnswerSchemaClass } from '../entities/user-exam-answer.schema';
import { UserExamAnswerRepository } from '../../user-exam-answer.repository';
import { UserExamAnswer } from '../../../../domain/user-exam-answer';
import { UserExamAnswerMapper } from '../mappers/user-exam-answer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ExamPassageQuestion } from '../../../../../exam-passage-questions/domain/exam-passage-question';
import { UserExam } from '../../../../../user-exams/domain/user-exam';

@Injectable()
export class UserExamAnswerDocumentRepository
  implements UserExamAnswerRepository
{
  constructor(
    @InjectModel(UserExamAnswerSchemaClass.name)
    private readonly userExamAnswerModel: Model<UserExamAnswerSchemaClass>,
  ) {}

  async create(data: UserExamAnswer): Promise<UserExamAnswer> {
    const persistenceModel = UserExamAnswerMapper.toPersistence(data);
    const createdEntity = new this.userExamAnswerModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return UserExamAnswerMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExamAnswer[]> {
    const entityObjects = await this.userExamAnswerModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserExamAnswerMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: UserExamAnswer['id'],
  ): Promise<NullableType<UserExamAnswer>> {
    const entityObject = await this.userExamAnswerModel.findById(id);
    return entityObject ? UserExamAnswerMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: UserExamAnswer['id'][]): Promise<UserExamAnswer[]> {
    const entityObjects = await this.userExamAnswerModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      UserExamAnswerMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserExamAnswer['id'],
    payload: Partial<UserExamAnswer>,
  ): Promise<NullableType<UserExamAnswer>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userExamAnswerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.userExamAnswerModel.findOneAndUpdate(
      filter,
      UserExamAnswerMapper.toPersistence({
        ...UserExamAnswerMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? UserExamAnswerMapper.toDomain(entityObject) : null;
  }

  async remove(id: UserExamAnswer['id']): Promise<void> {
    await this.userExamAnswerModel.deleteOne({ _id: id });
  }

  async findByUserExamAndExamPassageQuestion(
    userExamId: UserExam['id'],
    examPassageQuestionId: ExamPassageQuestion['id'],
  ): Promise<NullableType<UserExamAnswer>> {
    const userExamAnswer = await this.userExamAnswerModel
      .findOne({
        userExam: {
          _id: userExamId,
        },
        examPassageQuestion: {
          _id: examPassageQuestionId,
        },
      })
      .sort({ createdAt: -1 });

    return userExamAnswer
      ? UserExamAnswerMapper.toDomain(userExamAnswer)
      : null;
  }
  async findByUserExamId(
    userExamId: UserExam['id'],
  ): Promise<UserExamAnswer[]> {
    const userExamAnswers = await this.userExamAnswerModel
      .find({
        userExam: {
          _id: userExamId,
        },
      })
      .populate<UserExamAnswer[]>('examPassageQuestion');
    return userExamAnswers.map(UserExamAnswerMapper.toDomain);
  }
}
