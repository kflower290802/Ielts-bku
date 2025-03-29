import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamSpeakQuestionSchemaClass } from '../entities/exam-speak-question.schema';
import { ExamSpeakQuestionRepository } from '../../exam-speak-question.repository';
import { ExamSpeakQuestion } from '../../../../domain/exam-speak-question';
import { ExamSpeakQuestionMapper } from '../mappers/exam-speak-question.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ExamSpeakPart } from '../../../../../exam-speak-parts/domain/exam-speak-part';

@Injectable()
export class ExamSpeakQuestionDocumentRepository
  implements ExamSpeakQuestionRepository
{
  constructor(
    @InjectModel(ExamSpeakQuestionSchemaClass.name)
    private readonly examSpeakQuestionModel: Model<ExamSpeakQuestionSchemaClass>,
  ) {}

  async create(data: ExamSpeakQuestion): Promise<ExamSpeakQuestion> {
    const persistenceModel = ExamSpeakQuestionMapper.toPersistence(data);
    const createdEntity = new this.examSpeakQuestionModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamSpeakQuestionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamSpeakQuestion[]> {
    const entityObjects = await this.examSpeakQuestionModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExamSpeakQuestionMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: ExamSpeakQuestion['id'],
  ): Promise<NullableType<ExamSpeakQuestion>> {
    const entityObject = await this.examSpeakQuestionModel.findById(id);
    return entityObject ? ExamSpeakQuestionMapper.toDomain(entityObject) : null;
  }

  async findByIds(
    ids: ExamSpeakQuestion['id'][],
  ): Promise<ExamSpeakQuestion[]> {
    const entityObjects = await this.examSpeakQuestionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExamSpeakQuestionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamSpeakQuestion['id'],
    payload: Partial<ExamSpeakQuestion>,
  ): Promise<NullableType<ExamSpeakQuestion>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examSpeakQuestionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examSpeakQuestionModel.findOneAndUpdate(
      filter,
      ExamSpeakQuestionMapper.toPersistence({
        ...ExamSpeakQuestionMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExamSpeakQuestionMapper.toDomain(entityObject) : null;
  }

  async remove(id: ExamSpeakQuestion['id']): Promise<void> {
    await this.examSpeakQuestionModel.deleteOne({ _id: id });
  }

  async findAllByPartId(
    partId: ExamSpeakPart['id'],
  ): Promise<ExamSpeakQuestion[]> {
    const entityObjects = await this.examSpeakQuestionModel.find({
      part: { _id: partId },
    });
    return entityObjects.map(ExamSpeakQuestionMapper.toDomain);
  }
}
