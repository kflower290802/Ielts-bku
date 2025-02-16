import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamPassageSchemaClass } from '../entities/exam-passage.schema';
import { ExamPassageRepository } from '../../exam-passage.repository';
import { ExamPassage } from '../../../../domain/exam-passage';
import { ExamPassageMapper } from '../mappers/exam-passage.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ExamPassageDocumentRepository implements ExamPassageRepository {
  constructor(
    @InjectModel(ExamPassageSchemaClass.name)
    private readonly examPassageModel: Model<ExamPassageSchemaClass>,
  ) {}

  async create(data: ExamPassage): Promise<ExamPassage> {
    const persistenceModel = ExamPassageMapper.toPersistence(data);
    const createdEntity = new this.examPassageModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamPassageMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamPassage[]> {
    const entityObjects = await this.examPassageModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExamPassageMapper.toDomain(entityObject),
    );
  }

  async findById(id: ExamPassage['id']): Promise<NullableType<ExamPassage>> {
    const entityObject = await this.examPassageModel.findById(id);
    return entityObject ? ExamPassageMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: ExamPassage['id'][]): Promise<ExamPassage[]> {
    const entityObjects = await this.examPassageModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExamPassageMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamPassage['id'],
    payload: Partial<ExamPassage>,
  ): Promise<NullableType<ExamPassage>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examPassageModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examPassageModel.findOneAndUpdate(
      filter,
      ExamPassageMapper.toPersistence({
        ...ExamPassageMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExamPassageMapper.toDomain(entityObject) : null;
  }

  async remove(id: ExamPassage['id']): Promise<void> {
    await this.examPassageModel.deleteOne({ _id: id });
  }
}
