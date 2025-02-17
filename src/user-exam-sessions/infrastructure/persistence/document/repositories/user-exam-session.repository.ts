import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserExamSessionSchemaClass } from '../entities/user-exam-session.schema';
import { UserExamSessionRepository } from '../../user-exam-session.repository';
import { UserExamSession } from '../../../../domain/user-exam-session';
import { UserExamSessionMapper } from '../mappers/user-exam-session.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { UserExam } from '../../../../../user-exams/domain/user-exam';

@Injectable()
export class UserExamSessionDocumentRepository
  implements UserExamSessionRepository
{
  constructor(
    @InjectModel(UserExamSessionSchemaClass.name)
    private readonly userExamSessionModel: Model<UserExamSessionSchemaClass>,
  ) {}

  async create(data: UserExamSession): Promise<UserExamSession> {
    const persistenceModel = UserExamSessionMapper.toPersistence(data);
    const createdEntity = new this.userExamSessionModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return UserExamSessionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExamSession[]> {
    const entityObjects = await this.userExamSessionModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserExamSessionMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: UserExamSession['id'],
  ): Promise<NullableType<UserExamSession>> {
    const entityObject = await this.userExamSessionModel.findById(id);
    return entityObject ? UserExamSessionMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: UserExamSession['id'][]): Promise<UserExamSession[]> {
    const entityObjects = await this.userExamSessionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      UserExamSessionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserExamSession['id'],
    payload: Partial<UserExamSession>,
  ): Promise<NullableType<UserExamSession>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userExamSessionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.userExamSessionModel.findOneAndUpdate(
      filter,
      UserExamSessionMapper.toPersistence({
        ...UserExamSessionMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? UserExamSessionMapper.toDomain(entityObject) : null;
  }

  async remove(id: UserExamSession['id']): Promise<void> {
    await this.userExamSessionModel.deleteOne({ _id: id });
  }

  async getSessionsByUserExamId(
    userExamId: UserExam['id'],
  ): Promise<UserExamSession[]> {
    const entityObjects = await this.userExamSessionModel.find({
      userExam: {
        _id: userExamId,
      },
    });
    return entityObjects.map(UserExamSessionMapper.toDomain);
  }
}
