import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamReadingTypeSchemaClass } from '../entities/exam-reading-type.schema';
import { ExamReadingTypeRepository } from '../../exam-reading-type.repository';
import { ExamReadingType } from '../../../../domain/exam-reading-type';
import { ExamReadingTypeMapper } from '../mappers/exam-reading-type.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ExamReadingTypeDocumentRepository
  implements ExamReadingTypeRepository
{
  constructor(
    @InjectModel(ExamReadingTypeSchemaClass.name)
    private readonly examReadingTypeModel: Model<ExamReadingTypeSchemaClass>,
  ) {}

  async create(data: ExamReadingType): Promise<ExamReadingType> {
    const persistenceModel = ExamReadingTypeMapper.toPersistence(data);
    const createdEntity = new this.examReadingTypeModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamReadingTypeMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamReadingType[]> {
    const entityObjects = await this.examReadingTypeModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExamReadingTypeMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: ExamReadingType['id'],
  ): Promise<NullableType<ExamReadingType>> {
    const entityObject = await this.examReadingTypeModel.findById(id);
    return entityObject ? ExamReadingTypeMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: ExamReadingType['id'][]): Promise<ExamReadingType[]> {
    const entityObjects = await this.examReadingTypeModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExamReadingTypeMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamReadingType['id'],
    payload: Partial<ExamReadingType>,
  ): Promise<NullableType<ExamReadingType>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examReadingTypeModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examReadingTypeModel.findOneAndUpdate(
      filter,
      ExamReadingTypeMapper.toPersistence({
        ...ExamReadingTypeMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExamReadingTypeMapper.toDomain(entityObject) : null;
  }

  async remove(id: ExamReadingType['id']): Promise<void> {
    await this.examReadingTypeModel.deleteOne({ _id: id });
  }
  async findByPassageId(id: string): Promise<ExamReadingType[]> {
    const entities = await this.examReadingTypeModel.find({
      examPassage: {
        _id: id,
      },
    });
    return entities.map(ExamReadingTypeMapper.toDomain);
  }
}
