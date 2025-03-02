import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamListenAnswerSchemaClass } from '../entities/exam-listen-answer.schema';
import { ExamListenAnswerRepository } from '../../exam-listen-answer.repository';
import { ExamListenAnswer } from '../../../../domain/exam-listen-answer';
import { ExamListenAnswerMapper } from '../mappers/exam-listen-answer.mapper';

@Injectable()
export class ExamListenAnswerDocumentRepository
  implements ExamListenAnswerRepository
{
  constructor(
    @InjectModel(ExamListenAnswerSchemaClass.name)
    private readonly examListenAnswerModel: Model<ExamListenAnswerSchemaClass>,
  ) {}

  async create(data: ExamListenAnswer): Promise<ExamListenAnswer> {
    const persistenceModel = ExamListenAnswerMapper.toPersistence(data);
    const createdEntity = new this.examListenAnswerModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamListenAnswerMapper.toDomain(entityObject);
  }

  async findById(
    id: ExamListenAnswer['id'],
  ): Promise<NullableType<ExamListenAnswer>> {
    const entityObject = await this.examListenAnswerModel.findById(id);
    return entityObject ? ExamListenAnswerMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: ExamListenAnswer['id'][]): Promise<ExamListenAnswer[]> {
    const entityObjects = await this.examListenAnswerModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExamListenAnswerMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamListenAnswer['id'],
    payload: Partial<ExamListenAnswer>,
  ): Promise<NullableType<ExamListenAnswer>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examListenAnswerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examListenAnswerModel.findOneAndUpdate(
      filter,
      ExamListenAnswerMapper.toPersistence({
        ...ExamListenAnswerMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExamListenAnswerMapper.toDomain(entityObject) : null;
  }

  async remove(id: ExamListenAnswer['id']): Promise<void> {
    await this.examListenAnswerModel.deleteOne({ _id: id });
  }

  async findByQuestionId(questionId: string): Promise<ExamListenAnswer[]> {
    const answers = await this.examListenAnswerModel
      .find({
        examListenQuestion: {
          _id: questionId,
        },
      })
      .select('-isCorrect');
    return answers.map(ExamListenAnswerMapper.toDomain);
  }
}
