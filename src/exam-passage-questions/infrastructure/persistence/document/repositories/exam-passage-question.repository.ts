import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamPassageQuestionSchemaClass } from '../entities/exam-passage-question.schema';
import { ExamPassageQuestionRepository } from '../../exam-passage-question.repository';
import { ExamPassageQuestion } from '../../../../domain/exam-passage-question';
import { ExamPassageQuestionMapper } from '../mappers/exam-passage-question.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ExamPassage } from '../../../../../exam-passages/domain/exam-passage';

@Injectable()
export class ExamPassageQuestionDocumentRepository
  implements ExamPassageQuestionRepository
{
  constructor(
    @InjectModel(ExamPassageQuestionSchemaClass.name)
    private readonly examPassageQuestionModel: Model<ExamPassageQuestionSchemaClass>,
  ) {}

  async create(data: ExamPassageQuestion): Promise<ExamPassageQuestion> {
    const persistenceModel = ExamPassageQuestionMapper.toPersistence(data);
    const createdEntity = new this.examPassageQuestionModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamPassageQuestionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamPassageQuestion[]> {
    const entityObjects = await this.examPassageQuestionModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExamPassageQuestionMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: ExamPassageQuestion['id'],
  ): Promise<NullableType<ExamPassageQuestion>> {
    const entityObject = await this.examPassageQuestionModel.findById(id);
    return entityObject
      ? ExamPassageQuestionMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: ExamPassageQuestion['id'][],
  ): Promise<ExamPassageQuestion[]> {
    const entityObjects = await this.examPassageQuestionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExamPassageQuestionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamPassageQuestion['id'],
    payload: Partial<ExamPassageQuestion>,
  ): Promise<NullableType<ExamPassageQuestion>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examPassageQuestionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examPassageQuestionModel.findOneAndUpdate(
      filter,
      ExamPassageQuestionMapper.toPersistence({
        ...ExamPassageQuestionMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject
      ? ExamPassageQuestionMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: ExamPassageQuestion['id']): Promise<void> {
    await this.examPassageQuestionModel.deleteOne({ _id: id });
  }

  async findByExamPassageId(
    id: ExamPassage['id'],
  ): Promise<ExamPassageQuestion[]> {
    const examPassageQuestion = await this.examPassageQuestionModel.find({
      examPassage: {
        _id: id,
      },
    });
    return examPassageQuestion.map(ExamPassageQuestionMapper.toDomain);
  }
}
