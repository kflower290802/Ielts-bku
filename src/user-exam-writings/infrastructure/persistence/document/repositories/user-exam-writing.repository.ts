import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserExamWritingSchemaClass } from '../entities/user-exam-writing.schema';
import { UserExamWritingRepository } from '../../user-exam-writing.repository';
import { UserExamWriting } from '../../../../domain/user-exam-writing';
import { UserExamWritingMapper } from '../mappers/user-exam-writing.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UserExamWritingDocumentRepository
  implements UserExamWritingRepository
{
  constructor(
    @InjectModel(UserExamWritingSchemaClass.name)
    private readonly userExamWritingModel: Model<UserExamWritingSchemaClass>,
  ) {}

  async create(data: UserExamWriting): Promise<UserExamWriting> {
    const persistenceModel = UserExamWritingMapper.toPersistence(data);
    const createdEntity = new this.userExamWritingModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return UserExamWritingMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExamWriting[]> {
    const entityObjects = await this.userExamWritingModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserExamWritingMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: UserExamWriting['id'],
  ): Promise<NullableType<UserExamWriting>> {
    const entityObject = await this.userExamWritingModel.findById(id);
    return entityObject ? UserExamWritingMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: UserExamWriting['id'][]): Promise<UserExamWriting[]> {
    const entityObjects = await this.userExamWritingModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      UserExamWritingMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserExamWriting['id'],
    payload: Partial<UserExamWriting>,
  ): Promise<NullableType<UserExamWriting>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userExamWritingModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.userExamWritingModel.findOneAndUpdate(
      filter,
      UserExamWritingMapper.toPersistence({
        ...UserExamWritingMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? UserExamWritingMapper.toDomain(entityObject) : null;
  }

  async remove(id: UserExamWriting['id']): Promise<void> {
    await this.userExamWritingModel.deleteOne({ _id: id });
  }

  async findByUserExamId(userExamId: string): Promise<UserExamWriting[]> {
    const entities = await this.userExamWritingModel.find({
      userExam: {
        _id: userExamId,
      },
    });
    return entities.map(UserExamWritingMapper.toDomain);
  }
  findByUserExamIdAndExamWritingId(
    userExamId: string,
    examWritingId: string,
  ): Promise<NullableType<UserExamWriting>> {
    return this.userExamWritingModel.findOne({
      userExam: {
        _id: userExamId,
      },
      examWriting: {
        _id: examWritingId,
      },
    });
  }
}
