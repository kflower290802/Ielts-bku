import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PracticeSpeakingQuestionSchemaClass } from '../entities/practice-speaking-question.schema';
import { PracticeSpeakingQuestionRepository } from '../../practice-speaking-question.repository';
import { PracticeSpeakingQuestion } from '../../../../domain/practice-speaking-question';
import { PracticeSpeakingQuestionMapper } from '../mappers/practice-speaking-question.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PracticeSpeakingQuestionDocumentRepository
  implements PracticeSpeakingQuestionRepository
{
  constructor(
    @InjectModel(PracticeSpeakingQuestionSchemaClass.name)
    private readonly practiceSpeakingQuestionModel: Model<PracticeSpeakingQuestionSchemaClass>,
  ) {}

  async create(
    data: PracticeSpeakingQuestion,
  ): Promise<PracticeSpeakingQuestion> {
    const persistenceModel = PracticeSpeakingQuestionMapper.toPersistence(data);
    const createdEntity = new this.practiceSpeakingQuestionModel(
      persistenceModel,
    );
    const entityObject = await createdEntity.save();
    return PracticeSpeakingQuestionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeSpeakingQuestion[]> {
    const entityObjects = await this.practiceSpeakingQuestionModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PracticeSpeakingQuestionMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: PracticeSpeakingQuestion['id'],
  ): Promise<NullableType<PracticeSpeakingQuestion>> {
    const entityObject = await this.practiceSpeakingQuestionModel.findById(id);
    return entityObject
      ? PracticeSpeakingQuestionMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: PracticeSpeakingQuestion['id'][],
  ): Promise<PracticeSpeakingQuestion[]> {
    const entityObjects = await this.practiceSpeakingQuestionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      PracticeSpeakingQuestionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: PracticeSpeakingQuestion['id'],
    payload: Partial<PracticeSpeakingQuestion>,
  ): Promise<NullableType<PracticeSpeakingQuestion>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.practiceSpeakingQuestionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject =
      await this.practiceSpeakingQuestionModel.findOneAndUpdate(
        filter,
        PracticeSpeakingQuestionMapper.toPersistence({
          ...PracticeSpeakingQuestionMapper.toDomain(entity),
          ...clonedPayload,
        }),
        { new: true },
      );

    return entityObject
      ? PracticeSpeakingQuestionMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: PracticeSpeakingQuestion['id']): Promise<void> {
    await this.practiceSpeakingQuestionModel.deleteOne({ _id: id });
  }

  async findByPracticeId(id: string): Promise<PracticeSpeakingQuestion[]> {
    const entities = await this.practiceSpeakingQuestionModel.find({
      practice: {
        _id: id,
      },
    });
    return entities.map(PracticeSpeakingQuestionMapper.toDomain);
  }
}
