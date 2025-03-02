import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamListenSectionSchemaClass } from '../entities/exam-listen-section.schema';
import { ExamListenSectionRepository } from '../../exam-listen-section.repository';
import { ExamListenSection } from '../../../../domain/exam-listen-section';
import { ExamListenSectionMapper } from '../mappers/exam-listen-section.mapper';
import { Exam } from '../../../../../exams/domain/exam';

@Injectable()
export class ExamListenSectionDocumentRepository
  implements ExamListenSectionRepository
{
  constructor(
    @InjectModel(ExamListenSectionSchemaClass.name)
    private readonly examListenSectionModel: Model<ExamListenSectionSchemaClass>,
  ) {}

  async create(data: ExamListenSection): Promise<ExamListenSection> {
    const persistenceModel = ExamListenSectionMapper.toPersistence(data);
    const createdEntity = new this.examListenSectionModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamListenSectionMapper.toDomain(entityObject);
  }

  async findSectionsByExamId(examId: Exam['id']): Promise<ExamListenSection[]> {
    const examSections = await this.examListenSectionModel.find({
      exam: {
        _id: examId,
      },
    });
    return examSections.map(ExamListenSectionMapper.toDomain);
  }

  async findById(
    id: ExamListenSection['id'],
  ): Promise<NullableType<ExamListenSection>> {
    const entityObject = await this.examListenSectionModel.findById(id);
    return entityObject ? ExamListenSectionMapper.toDomain(entityObject) : null;
  }

  async findByIds(
    ids: ExamListenSection['id'][],
  ): Promise<ExamListenSection[]> {
    const entityObjects = await this.examListenSectionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExamListenSectionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamListenSection['id'],
    payload: Partial<ExamListenSection>,
  ): Promise<NullableType<ExamListenSection>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examListenSectionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examListenSectionModel.findOneAndUpdate(
      filter,
      ExamListenSectionMapper.toPersistence({
        ...ExamListenSectionMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExamListenSectionMapper.toDomain(entityObject) : null;
  }

  async remove(id: ExamListenSection['id']): Promise<void> {
    await this.examListenSectionModel.deleteOne({ _id: id });
  }
}
