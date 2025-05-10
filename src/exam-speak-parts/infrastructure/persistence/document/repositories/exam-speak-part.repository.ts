import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamSpeakPartSchemaClass } from '../entities/exam-speak-part.schema';
import { ExamSpeakPartRepository } from '../../exam-speak-part.repository';
import { ExamSpeakPart } from '../../../../domain/exam-speak-part';
import { ExamSpeakPartMapper } from '../mappers/exam-speak-part.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ExamSpeakPartDocumentRepository
  implements ExamSpeakPartRepository
{
  constructor(
    @InjectModel(ExamSpeakPartSchemaClass.name)
    private readonly examSpeakPartModel: Model<ExamSpeakPartSchemaClass>,
  ) {}

  async create(data: ExamSpeakPart): Promise<ExamSpeakPart> {
    const persistenceModel = ExamSpeakPartMapper.toPersistence(data);
    const createdEntity = new this.examSpeakPartModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamSpeakPartMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamSpeakPart[]> {
    const entityObjects = await this.examSpeakPartModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExamSpeakPartMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: ExamSpeakPart['id'],
  ): Promise<NullableType<ExamSpeakPart>> {
    const entityObject = await this.examSpeakPartModel.findById(id);
    return entityObject ? ExamSpeakPartMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: ExamSpeakPart['id'][]): Promise<ExamSpeakPart[]> {
    const entityObjects = await this.examSpeakPartModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExamSpeakPartMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamSpeakPart['id'],
    payload: Partial<ExamSpeakPart>,
  ): Promise<NullableType<ExamSpeakPart>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examSpeakPartModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examSpeakPartModel.findOneAndUpdate(
      filter,
      ExamSpeakPartMapper.toPersistence({
        ...ExamSpeakPartMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExamSpeakPartMapper.toDomain(entityObject) : null;
  }

  async remove(id: ExamSpeakPart['id']): Promise<void> {
    await this.examSpeakPartModel.deleteOne({ _id: id });
  }

  async findAllByExamId(examId: string): Promise<ExamSpeakPart[]> {
    const entityObjects = await this.examSpeakPartModel.find({
      exam: { _id: examId },
    });
    return entityObjects.map(ExamSpeakPartMapper.toDomain);
  }
}
