import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamSpeakSchemaClass } from '../entities/exam-speak.schema';
import { ExamSpeakRepository } from '../../exam-speak.repository';
import { ExamSpeak } from '../../../../domain/exam-speak';
import { ExamSpeakMapper } from '../mappers/exam-speak.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ExamSpeakDocumentRepository implements ExamSpeakRepository {
  constructor(
    @InjectModel(ExamSpeakSchemaClass.name)
    private readonly examSpeakModel: Model<ExamSpeakSchemaClass>,
  ) {}

  async create(data: ExamSpeak): Promise<ExamSpeak> {
    const persistenceModel = ExamSpeakMapper.toPersistence(data);
    const createdEntity = new this.examSpeakModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamSpeakMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamSpeak[]> {
    const entityObjects = await this.examSpeakModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExamSpeakMapper.toDomain(entityObject),
    );
  }

  async findById(id: ExamSpeak['id']): Promise<NullableType<ExamSpeak>> {
    const entityObject = await this.examSpeakModel.findById(id);
    return entityObject ? ExamSpeakMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: ExamSpeak['id'][]): Promise<ExamSpeak[]> {
    const entityObjects = await this.examSpeakModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      ExamSpeakMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamSpeak['id'],
    payload: Partial<ExamSpeak>,
  ): Promise<NullableType<ExamSpeak>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examSpeakModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examSpeakModel.findOneAndUpdate(
      filter,
      ExamSpeakMapper.toPersistence({
        ...ExamSpeakMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExamSpeakMapper.toDomain(entityObject) : null;
  }

  async remove(id: ExamSpeak['id']): Promise<void> {
    await this.examSpeakModel.deleteOne({ _id: id });
  }

  async findByExamId(id: string): Promise<NullableType<ExamSpeak>> {
    const entity = await this.examSpeakModel.findOne({
      exam: {
        _id: id,
      },
    });
    return entity ? ExamSpeakMapper.toDomain(entity) : null;
  }
}
