import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamListenQuestionSchemaClass } from '../entities/exam-listen-question.schema';
import { ExamListenQuestionRepository } from '../../exam-listen-question.repository';
import { ExamListenQuestion } from '../../../../domain/exam-listen-question';
import { ExamListenQuestionMapper } from '../mappers/exam-listen-question.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ExamListenQuestionDocumentRepository
  implements ExamListenQuestionRepository
{
  constructor(
    @InjectModel(ExamListenQuestionSchemaClass.name)
    private readonly examListenQuestionModel: Model<ExamListenQuestionSchemaClass>,
  ) {}

  async create(data: ExamListenQuestion): Promise<ExamListenQuestion> {
    const persistenceModel = ExamListenQuestionMapper.toPersistence(data);
    const createdEntity = new this.examListenQuestionModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamListenQuestionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamListenQuestion[]> {
    const entityObjects = await this.examListenQuestionModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExamListenQuestionMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: ExamListenQuestion['id'],
  ): Promise<NullableType<ExamListenQuestion>> {
    const entityObject = await this.examListenQuestionModel.findById(id);
    return entityObject
      ? ExamListenQuestionMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: ExamListenQuestion['id'][],
  ): Promise<ExamListenQuestion[]> {
    const entityObjects = await this.examListenQuestionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExamListenQuestionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamListenQuestion['id'],
    payload: Partial<ExamListenQuestion>,
  ): Promise<NullableType<ExamListenQuestion>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examListenQuestionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examListenQuestionModel.findOneAndUpdate(
      filter,
      ExamListenQuestionMapper.toPersistence({
        ...ExamListenQuestionMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject
      ? ExamListenQuestionMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: ExamListenQuestion['id']): Promise<void> {
    await this.examListenQuestionModel.deleteOne({ _id: id });
  }

  async findBySectionId(sectionId: string): Promise<ExamListenQuestion[]> {
    const questions = await this.examListenQuestionModel.find({
      examListenSection: {
        _id: sectionId,
      },
    });
    return questions.map(ExamListenQuestionMapper.toDomain);
  }
}
