import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamPassageAnswerSchemaClass } from '../entities/exam-passage-answer.schema';
import { ExamPassageAnswerRepository } from '../../exam-passage-answer.repository';
import { ExamPassageAnswer } from '../../../../domain/exam-passage-answer';
import { ExamPassageAnswerMapper } from '../mappers/exam-passage-answer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ExamPassageAnswerDocumentRepository
  implements ExamPassageAnswerRepository
{
  constructor(
    @InjectModel(ExamPassageAnswerSchemaClass.name)
    private readonly examPassageAnswerModel: Model<ExamPassageAnswerSchemaClass>,
  ) {}

  async create(data: ExamPassageAnswer): Promise<ExamPassageAnswer> {
    const persistenceModel = ExamPassageAnswerMapper.toPersistence(data);
    const createdEntity = new this.examPassageAnswerModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamPassageAnswerMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamPassageAnswer[]> {
    const entityObjects = await this.examPassageAnswerModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExamPassageAnswerMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: ExamPassageAnswer['id'],
  ): Promise<NullableType<ExamPassageAnswer>> {
    const entityObject = await this.examPassageAnswerModel.findById(id);
    return entityObject ? ExamPassageAnswerMapper.toDomain(entityObject) : null;
  }

  async findByIds(
    ids: ExamPassageAnswer['id'][],
  ): Promise<ExamPassageAnswer[]> {
    const entityObjects = await this.examPassageAnswerModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExamPassageAnswerMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamPassageAnswer['id'],
    payload: Partial<ExamPassageAnswer>,
  ): Promise<NullableType<ExamPassageAnswer>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examPassageAnswerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examPassageAnswerModel.findOneAndUpdate(
      filter,
      ExamPassageAnswerMapper.toPersistence({
        ...ExamPassageAnswerMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExamPassageAnswerMapper.toDomain(entityObject) : null;
  }

  async remove(id: ExamPassageAnswer['id']): Promise<void> {
    await this.examPassageAnswerModel.deleteOne({ _id: id });
  }

  async findByQuestionId(questionId: string): Promise<ExamPassageAnswer[]> {
    const entities = await this.examPassageAnswerModel
      .find({
        question: {
          _id: questionId,
        },
        isCorrect: true,
      })
      .populate('question');
    return entities.map(ExamPassageAnswerMapper.toDomain);
  }

  async findAllByQuestionId(questionId: string): Promise<ExamPassageAnswer[]> {
    const entities = await this.examPassageAnswerModel
      .find({
        question: {
          _id: questionId,
        },
      })
      .select('-isCorrect');
    return entities.map(ExamPassageAnswerMapper.toDomain);
  }
}
