import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PracticeReadingQuestionSchemaClass } from '../entities/practice-reading-question.schema';
import { PracticeReadingQuestionRepository } from '../../practice-reading-question.repository';
import { PracticeReadingQuestion } from '../../../../domain/practice-reading-question';
import { PracticeReadingQuestionMapper } from '../mappers/practice-reading-question.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PracticeReadingQuestionDocumentRepository
  implements PracticeReadingQuestionRepository
{
  constructor(
    @InjectModel(PracticeReadingQuestionSchemaClass.name)
    private readonly practiceReadingQuestionModel: Model<PracticeReadingQuestionSchemaClass>,
  ) {}

  async create(
    data: PracticeReadingQuestion,
  ): Promise<PracticeReadingQuestion> {
    const persistenceModel = PracticeReadingQuestionMapper.toPersistence(data);
    const createdEntity = new this.practiceReadingQuestionModel(
      persistenceModel,
    );
    const entityObject = await createdEntity.save();
    return PracticeReadingQuestionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeReadingQuestion[]> {
    const entityObjects = await this.practiceReadingQuestionModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PracticeReadingQuestionMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: PracticeReadingQuestion['id'],
  ): Promise<NullableType<PracticeReadingQuestion>> {
    const entityObject = await this.practiceReadingQuestionModel.findById(id);
    return entityObject
      ? PracticeReadingQuestionMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: PracticeReadingQuestion['id'][],
  ): Promise<PracticeReadingQuestion[]> {
    const entityObjects = await this.practiceReadingQuestionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      PracticeReadingQuestionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: PracticeReadingQuestion['id'],
    payload: Partial<PracticeReadingQuestion>,
  ): Promise<NullableType<PracticeReadingQuestion>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.practiceReadingQuestionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject =
      await this.practiceReadingQuestionModel.findOneAndUpdate(
        filter,
        PracticeReadingQuestionMapper.toPersistence({
          ...PracticeReadingQuestionMapper.toDomain(entity),
          ...clonedPayload,
        }),
        { new: true },
      );

    return entityObject
      ? PracticeReadingQuestionMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: PracticeReadingQuestion['id']): Promise<void> {
    await this.practiceReadingQuestionModel.deleteOne({ _id: id });
  }

  async findByTypeId(id: string): Promise<PracticeReadingQuestion[]> {
    const entities = await this.practiceReadingQuestionModel.find({
      type: {
        _id: id,
      },
    });
    return entities.map(PracticeReadingQuestionMapper.toDomain);
  }
}
