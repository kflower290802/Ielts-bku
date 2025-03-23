import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PracticeWritingSchemaClass } from '../entities/practice-writing.schema';
import { PracticeWritingRepository } from '../../practice-writing.repository';
import { PracticeWriting } from '../../../../domain/practice-writing';
import { PracticeWritingMapper } from '../mappers/practice-writing.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PracticeWritingDocumentRepository
  implements PracticeWritingRepository
{
  constructor(
    @InjectModel(PracticeWritingSchemaClass.name)
    private readonly practiceWritingModel: Model<PracticeWritingSchemaClass>,
  ) {}

  async create(data: PracticeWriting): Promise<PracticeWriting> {
    const persistenceModel = PracticeWritingMapper.toPersistence(data);
    const createdEntity = new this.practiceWritingModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return PracticeWritingMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeWriting[]> {
    const entityObjects = await this.practiceWritingModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PracticeWritingMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: PracticeWriting['id'],
  ): Promise<NullableType<PracticeWriting>> {
    const entityObject = await this.practiceWritingModel.findById(id);
    return entityObject ? PracticeWritingMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: PracticeWriting['id'][]): Promise<PracticeWriting[]> {
    const entityObjects = await this.practiceWritingModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      PracticeWritingMapper.toDomain(entityObject),
    );
  }

  async update(
    id: PracticeWriting['id'],
    payload: Partial<PracticeWriting>,
  ): Promise<NullableType<PracticeWriting>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.practiceWritingModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.practiceWritingModel.findOneAndUpdate(
      filter,
      PracticeWritingMapper.toPersistence({
        ...PracticeWritingMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? PracticeWritingMapper.toDomain(entityObject) : null;
  }

  async remove(id: PracticeWriting['id']): Promise<void> {
    await this.practiceWritingModel.deleteOne({ _id: id });
  }

  async findByPracticeId(id: string): Promise<NullableType<PracticeWriting>> {
    const entity = await this.practiceWritingModel.findOne({
      practice: {
        _id: id,
      },
    });
    return entity ? PracticeWritingMapper.toDomain(entity) : null;
  }
}
