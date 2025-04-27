import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPracticeSchemaClass } from '../entities/user-practice.schema';
import { UserPracticeRepository } from '../../user-practice.repository';
import { UserPractice } from '../../../../domain/user-practice';
import { UserPracticeMapper } from '../mappers/user-practice.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class UserPracticeDocumentRepository implements UserPracticeRepository {
  constructor(
    @InjectModel(UserPracticeSchemaClass.name)
    private readonly userPracticeModel: Model<UserPracticeSchemaClass>,
  ) {}

  async create(data: UserPractice): Promise<UserPractice> {
    const persistenceModel = UserPracticeMapper.toPersistence(data);
    const createdEntity = new this.userPracticeModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return UserPracticeMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPractice[]> {
    const entityObjects = await this.userPracticeModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserPracticeMapper.toDomain(entityObject),
    );
  }

  async findById(id: UserPractice['id']): Promise<NullableType<UserPractice>> {
    const entityObject = await this.userPracticeModel.findById(id);
    return entityObject ? UserPracticeMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: UserPractice['id'][]): Promise<UserPractice[]> {
    const entityObjects = await this.userPracticeModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      UserPracticeMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserPractice['id'],
    payload: Partial<UserPractice>,
  ): Promise<NullableType<UserPractice>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userPracticeModel
      .findOne(filter)
      .populate('user');
    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.userPracticeModel.findOneAndUpdate(
      filter,
      UserPracticeMapper.toPersistence({
        ...UserPracticeMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? UserPracticeMapper.toDomain(entityObject) : null;
  }

  async remove(id: UserPractice['id']): Promise<void> {
    await this.userPracticeModel.deleteOne({ _id: id });
  }

  async findByPracticeIdAndUserId(
    practiceId: string,
    userId: string,
  ): Promise<NullableType<UserPractice>> {
    const entity = await this.userPracticeModel
      .findOne({
        user: {
          _id: userId,
        },
        practice: {
          _id: practiceId,
        },
      })
      .sort({ createdAt: -1 });
    return entity ? UserPracticeMapper.toDomain(entity) : null;
  }

  async findUnCompletedUserPracticeByPracticeIdAndUserId(
    practiceId: string,
    userId: string,
  ): Promise<NullableType<UserPractice>> {
    const entity = await this.userPracticeModel
      .findOne({
        user: {
          _id: userId,
        },
        practice: {
          _id: practiceId,
        },
        isCompleted: false,
      })
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('practice');
    return entity ? UserPracticeMapper.toDomain(entity) : null;
  }

  async findCompletedUserPracticeByPracticeIdAndUserId(
    practice: string,
    userId: string,
  ): Promise<NullableType<UserPractice>> {
    const entity = await this.userPracticeModel
      .findOne({
        user: {
          _id: userId,
        },
        practice: {
          _id: practice,
        },
        isCompleted: true,
      })
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('practice');
    return entity ? UserPracticeMapper.toDomain(entity) : null;
  }

  async findUserPracticesByUserId(userId: string): Promise<UserPractice[]> {
    const entityObjects = await this.userPracticeModel.find({
      user: {
        _id: userId,
      },
    });
    return entityObjects.map((entityObject) =>
      UserPracticeMapper.toDomain(entityObject),
    );
  }

  async getUserPracticeByUserIdWithPagination(
    userId: string,
    limit = 5,
  ): Promise<UserPractice[]> {
    const entities = await this.userPracticeModel
      .find({ user: { _id: userId } })
      .populate('practice')
      .limit(limit);
    return entities.map((entity) => UserPracticeMapper.toDomain(entity));
  }

  async findByUserIdAndPracticeIdInDay(
    userId: string,
    practiceId: string,
  ): Promise<NullableType<UserPractice>> {
    const entityObject = await this.userPracticeModel.findOne({
      user: {
        _id: userId,
      },
      practice: {
        _id: practiceId,
      },
      updatedAt: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        $lte: new Date(),
      },
    });
    return entityObject ? UserPracticeMapper.toDomain(entityObject) : null;
  }
}
