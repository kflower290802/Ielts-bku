import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamWritingSchemaClass } from '../entities/exam-writing.schema';
import { ExamWritingRepository } from '../../exam-writing.repository';
import { ExamWriting } from '../../../../domain/exam-writing';
import { ExamWritingMapper } from '../mappers/exam-writing.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ExamWritingDocumentRepository implements ExamWritingRepository {
  constructor(
    @InjectModel(ExamWritingSchemaClass.name)
    private readonly examWritingModel: Model<ExamWritingSchemaClass>,
  ) {}

  async create(data: ExamWriting): Promise<ExamWriting> {
    const persistenceModel = ExamWritingMapper.toPersistence(data);
    const createdEntity = new this.examWritingModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamWritingMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamWriting[]> {
    const entityObjects = await this.examWritingModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExamWritingMapper.toDomain(entityObject),
    );
  }

  async findById(id: ExamWriting['id']): Promise<NullableType<ExamWriting>> {
    const entityObject = await this.examWritingModel.findById(id);
    return entityObject ? ExamWritingMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: ExamWriting['id'][]): Promise<ExamWriting[]> {
    const entityObjects = await this.examWritingModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExamWritingMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamWriting['id'],
    payload: Partial<ExamWriting>,
  ): Promise<NullableType<ExamWriting>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examWritingModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examWritingModel.findOneAndUpdate(
      filter,
      ExamWritingMapper.toPersistence({
        ...ExamWritingMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExamWritingMapper.toDomain(entityObject) : null;
  }

  async remove(id: ExamWriting['id']): Promise<void> {
    await this.examWritingModel.deleteOne({ _id: id });
  }

  async findByExamId(id: string): Promise<ExamWriting[]> {
    const entities = await this.examWritingModel.find({
      exam: {
        _id: id,
      },
    });
    return entities.map(ExamWritingMapper.toDomain);
  }
}
