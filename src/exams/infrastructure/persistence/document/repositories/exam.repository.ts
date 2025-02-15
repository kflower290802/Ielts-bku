import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamSchemaClass } from '../entities/exam.schema';
import { ExamRepository } from '../../exam.repository';
import { Exam } from '../../../../domain/exam';
import { ExamMapper } from '../mappers/exam.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ExamType } from '../../../../exams.type';

type ExamFilter = {
  type?: ExamType;
};

@Injectable()
export class examDocumentRepository implements ExamRepository {
  constructor(
    @InjectModel(ExamSchemaClass.name)
    private readonly examModel: Model<ExamSchemaClass>,
  ) {}

  async create(data: Exam): Promise<Exam> {
    const persistenceModel = ExamMapper.toPersistence(data);
    const createdEntity = new this.examModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
    type,
  }: {
    paginationOptions: IPaginationOptions;
    type?: ExamType;
  }): Promise<Exam[]> {
    const filters: ExamFilter = {};
    if (type) {
      filters.type = type;
    }
    const entityObjects = await this.examModel
      .find(filters)
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExamMapper.toDomain(entityObject),
    );
  }

  async findById(id: Exam['id']): Promise<NullableType<Exam>> {
    const entityObject = await this.examModel.findById(id);
    return entityObject ? ExamMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Exam['id'][]): Promise<Exam[]> {
    const entityObjects = await this.examModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      ExamMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Exam['id'],
    payload: Partial<Exam>,
  ): Promise<NullableType<Exam>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examModel.findOneAndUpdate(
      filter,
      ExamMapper.toPersistence({
        ...ExamMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExamMapper.toDomain(entityObject) : null;
  }

  async remove(id: Exam['id']): Promise<void> {
    await this.examModel.deleteOne({ _id: id });
  }
}
