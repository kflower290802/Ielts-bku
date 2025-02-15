import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserExamSchemaClass } from '../entities/user-exam.schema';
import { UserExamRepository } from '../../user-exam.repository';
import { UserExam } from '../../../../domain/user-exam';
import { UserExamMapper } from '../mappers/user-exam.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UserExamDocumentRepository implements UserExamRepository {
  constructor(
    @InjectModel(UserExamSchemaClass.name)
    private readonly userExamModel: Model<UserExamSchemaClass>,
  ) {}

  async create(data: UserExam): Promise<UserExam> {
    const persistenceModel = UserExamMapper.toPersistence(data);
    const createdEntity = new this.userExamModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return UserExamMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExam[]> {
    const entityObjects = await this.userExamModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserExamMapper.toDomain(entityObject),
    );
  }

  async findById(id: UserExam['id']): Promise<NullableType<UserExam>> {
    const entityObject = await this.userExamModel.findById(id);
    return entityObject ? UserExamMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: UserExam['id'][]): Promise<UserExam[]> {
    const entityObjects = await this.userExamModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      UserExamMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserExam['id'],
    payload: Partial<UserExam>,
  ): Promise<NullableType<UserExam>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userExamModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.userExamModel.findOneAndUpdate(
      filter,
      UserExamMapper.toPersistence({
        ...UserExamMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? UserExamMapper.toDomain(entityObject) : null;
  }

  async remove(id: UserExam['id']): Promise<void> {
    await this.userExamModel.deleteOne({ _id: id });
  }
}
