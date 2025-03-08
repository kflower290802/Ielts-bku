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
import { InfinityPaginationResponseDto } from '../../../../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../../../../utils/infinity-pagination';

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
  }): Promise<InfinityPaginationResponseDto<Exam>> {
    const filters: any = {};
    const { limit, page } = paginationOptions;
    const skip = (page - 1) * limit;

    if (year) {
      filters.year = +year;
    }
    if (type) {
      filters.type = type;
    }

    const entityObjects = await this.examModel.aggregate([
      {
        $lookup: {
          from: 'userExams', // Tên collection của UserExam (kiểm tra chính xác trong database)
          let: { examId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$exam', '$$examId'] }, // Liên kết với _id của Exam
                    { $eq: ['$user', new mongoose.Types.ObjectId(userId)] }, // Lọc theo userId
                  ],
                },
              },
            },
            { $sort: { createdAt: -1 } }, // Sắp xếp theo createdAt giảm dần để lấy bản ghi mới nhất
          ],
          as: 'userExams',
        },
      },
      {
        $addFields: {
          latestUserExam: { $arrayElemAt: ['$userExams', 0] }, // Lấy bản ghi UserExam mới nhất
        },
      },
      {
        $match: filters, // Áp dụng các bộ lọc như year, type
      },
      {
        $addFields: {
          status: {
            $cond: {
              if: { $eq: ['$latestUserExam', null] },
              then: ExamStatus.NotStarted,
              else: {
                $cond: {
                  if: { $lt: ['$latestUserExam.progress', 100] },
                  then: ExamStatus.InProgress,
                  else: ExamStatus.Completed,
                },
              },
            },
          },
        },
      },
      {
        $match: status ? { status } : {},
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
    const total = entityObjects[0]?.metadata[0]?.total || 0;
    return infinityPagination(
      result.map((entityObject) => ({
        ...ExamMapper.toDomain(entityObject),
        status: entityObject.status,
      })),
      {
        total,
        page,
        limit,
      },
    );
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
