import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PracticeListenQuestionSchemaClass } from '../entities/practice-listen-question.schema';
import { PracticeListenQuestionRepository } from '../../practice-listen-question.repository';
import { PracticeListenQuestion } from '../../../../domain/practice-listen-question';
import { PracticeListenQuestionMapper } from '../mappers/practice-listen-question.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PracticeListenQuestionDocumentRepository
  implements PracticeListenQuestionRepository
{
  constructor(
    @InjectModel(PracticeListenQuestionSchemaClass.name)
    private readonly practiceListenQuestionModel: Model<PracticeListenQuestionSchemaClass>,
  ) {}

  async create(data: PracticeListenQuestion): Promise<PracticeListenQuestion> {
    const persistenceModel = PracticeListenQuestionMapper.toPersistence(data);
    const createdEntity = new this.practiceListenQuestionModel(
      persistenceModel,
    );
    const entityObject = await createdEntity.save();
    return PracticeListenQuestionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeListenQuestion[]> {
    const entityObjects = await this.practiceListenQuestionModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PracticeListenQuestionMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: PracticeListenQuestion['id'],
  ): Promise<NullableType<PracticeListenQuestion>> {
    const entityObject = await this.practiceListenQuestionModel.findById(id);
    return entityObject
      ? PracticeListenQuestionMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: PracticeListenQuestion['id'][],
  ): Promise<PracticeListenQuestion[]> {
    const entityObjects = await this.practiceListenQuestionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      PracticeListenQuestionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: PracticeListenQuestion['id'],
    payload: Partial<PracticeListenQuestion>,
  ): Promise<NullableType<PracticeListenQuestion>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.practiceListenQuestionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject =
      await this.practiceListenQuestionModel.findOneAndUpdate(
        filter,
        PracticeListenQuestionMapper.toPersistence({
          ...PracticeListenQuestionMapper.toDomain(entity),
          ...clonedPayload,
        }),
        { new: true },
      );

    return entityObject
      ? PracticeListenQuestionMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: PracticeListenQuestion['id']): Promise<void> {
    await this.practiceListenQuestionModel.deleteOne({ _id: id });
  }

  async findByTypeId(id: string): Promise<PracticeListenQuestion[]> {
    const entities = await this.practiceListenQuestionModel.find({
      type: {
        _id: id,
      },
    });
    return entities.map(PracticeListenQuestionMapper.toDomain);
  }
}
