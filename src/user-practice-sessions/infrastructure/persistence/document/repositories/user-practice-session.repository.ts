import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPracticeSessionSchemaClass } from '../entities/user-practice-session.schema';
import { UserPracticeSessionRepository } from '../../user-practice-session.repository';
import { UserPracticeSession } from '../../../../domain/user-practice-session';
import { UserPracticeSessionMapper } from '../mappers/user-practice-session.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { User } from '../../../../../users/domain/user';
import { getAllDatesBetween } from '../../../../../utils/time';
import { UserPractice } from '../../../../../user-practices/domain/user-practice';

@Injectable()
export class UserPracticeSessionDocumentRepository
  implements UserPracticeSessionRepository
{
  constructor(
    @InjectModel(UserPracticeSessionSchemaClass.name)
    private readonly userPracticeSessionModel: Model<UserPracticeSessionSchemaClass>,
  ) {}

  async create(data: UserPracticeSession): Promise<UserPracticeSession> {
    const persistenceModel = UserPracticeSessionMapper.toPersistence(data);
    const createdEntity = new this.userPracticeSessionModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return UserPracticeSessionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPracticeSession[]> {
    const entityObjects = await this.userPracticeSessionModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      UserPracticeSessionMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: UserPracticeSession['id'],
  ): Promise<NullableType<UserPracticeSession>> {
    const entityObject = await this.userPracticeSessionModel.findById(id);
    return entityObject
      ? UserPracticeSessionMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: UserPracticeSession['id'][],
  ): Promise<UserPracticeSession[]> {
    const entityObjects = await this.userPracticeSessionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      UserPracticeSessionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: UserPracticeSession['id'],
    payload: Partial<UserPracticeSession>,
  ): Promise<NullableType<UserPracticeSession>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userPracticeSessionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.userPracticeSessionModel.findOneAndUpdate(
      filter,
      UserPracticeSessionMapper.toPersistence({
        ...UserPracticeSessionMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject
      ? UserPracticeSessionMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: UserPracticeSession['id']): Promise<void> {
    await this.userPracticeSessionModel.deleteOne({ _id: id });
  }

  async getTimeSpentByDay(
    userId: User['id'],
    startTime: Date,
    endTime: Date,
  ): Promise<{ date: string; [key: string]: any }[]> {
    const userPracticeSessions = await this.userPracticeSessionModel.find({
      user: {
        _id: userId,
      },
    });
    const allDays = getAllDatesBetween(startTime, endTime);
    const dayTimeSpentMap = new Map<string, number>();
    allDays.forEach((day) => {
      dayTimeSpentMap.set(day, 0);
    });
    userPracticeSessions.forEach((session) => {
      const sessionDate = session.createdAt.toISOString().split('T')[0];
      const timeSpent = session.endTime
        ? session.endTime.getTime() - session.startTime.getTime()
        : 0;
      dayTimeSpentMap.set(
        sessionDate,
        (dayTimeSpentMap.get(sessionDate) || 0) + timeSpent,
      );
    });
    return Array.from(dayTimeSpentMap.entries()).map(([date, timeSpent]) => ({
      date,
      timeSpent,
    }));
  }

  async findByUserPracticeId(
    userPracticeId: UserPractice['id'],
  ): Promise<NullableType<UserPracticeSession>> {
    const entityObject = await this.userPracticeSessionModel
      .findOne({
        userPractice: userPracticeId,
      })
      .sort({ updatedAt: -1 });
    return entityObject
      ? UserPracticeSessionMapper.toDomain(entityObject)
      : null;
  }

  async findByUserPracticeIds(
    userPracticeIds: UserPractice['id'][],
    startTime: Date,
    endTime: Date,
  ): Promise<UserPracticeSessionSchemaClass[]> {
    return this.userPracticeSessionModel
      .find({
        userPractice: {
          $in: userPracticeIds,
        },
        updatedAt: { $gte: startTime, $lte: endTime },
      })
      .populate({
        path: 'userPractice',
      });
  }
  async findAllByUserPracticeId(
    userPracticeId: UserPractice['id'],
  ): Promise<UserPracticeSession[]> {
    const entityObjects = await this.userPracticeSessionModel.find({
      userPractice: userPracticeId,
    });
    return entityObjects.map(UserPracticeSessionMapper.toDomain);
  }
}
