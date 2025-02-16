import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ExamSchemaClass } from '../entities/exam.schema';
import { ExamRepository } from '../../exam.repository';
import { Exam } from '../../../../domain/exam';
import { ExamMapper } from '../mappers/exam.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ExamStatus, ExamType } from '../../../../exams.type';
import { UserExamSchemaClass } from '../../../../../user-exams/infrastructure/persistence/document/entities/user-exam.schema';
import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';

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
    status,
    userId,
    year,
  }: {
    paginationOptions: IPaginationOptions;
    type?: ExamType;
    status?: ExamStatus;
    userId: string;
    year: number;
  }): Promise<Exam[]> {
    const filters: any = {};
    const { limit, page } = paginationOptions;
    const skip = (page - 1) * limit;
    if (year) {
      filters.year = +year;
    }

    if (type) {
      filters.type = type;
    }
    if (status === ExamStatus.NotStarted) {
      filters.userExams = {
        $not: {
          $elemMatch: { user: new mongoose.Types.ObjectId(userId) },
        },
      };
    }
    if (status === ExamStatus.InProgress) {
      filters.userExams = {
        $elemMatch: {
          user: new mongoose.Types.ObjectId(userId),
          progress: { $lt: 100 },
        },
      };
    }
    if (status === ExamStatus.Completed) {
      filters.userExams = {
        $elemMatch: {
          user: new mongoose.Types.ObjectId(userId),
          progress: 100,
        },
      };
    }
    const entityObjects = await this.examModel.aggregate([
      {
        $lookup: {
          from: UserExamSchemaClass.name,
          localField: '_id',
          foreignField: UserSchemaClass.name,
          as: 'userExams',
        },
      },
      {
        $match: filters,
      },
      {
        $addFields: {
          status: {
            $cond: {
              if: { $eq: [{ $size: '$userExams' }, 0] },
              then: ExamStatus.NotStarted,
              else: {
                $let: {
                  vars: { userExam: { $arrayElemAt: ['$userExams', 0] } },
                  in: {
                    $cond: {
                      if: { $lt: ['$$userExam.progress', 100] },
                      then: ExamStatus.InProgress,
                      else: ExamStatus.Completed,
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          type: 1,
          time: 1,
          year: 1,
          image: 1,
          createdAt: 1,
          updatedAt: 1,
          status: 1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $skip: skip }, { $limit: limit }],
        },
      },
    ]);

    const result = entityObjects[0]?.data || [];
    return result.map((entityObject) => ({
      ...ExamMapper.toDomain(entityObject),
      status: entityObject.status,
    }));
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

  findYearsExam(): Promise<number[]> {
    return this.examModel.distinct('year').sort('year');
  }
}
