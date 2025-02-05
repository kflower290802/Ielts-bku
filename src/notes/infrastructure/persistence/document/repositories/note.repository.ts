import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { noteSchemaClass } from '../entities/note.schema';
import { noteRepository } from '../../note.repository';
import { note } from '../../../../domain/note';
import { noteMapper } from '../mappers/note.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class noteDocumentRepository implements noteRepository {
  constructor(
    @InjectModel(noteSchemaClass.name)
    private readonly noteModel: Model<noteSchemaClass>,
  ) {}

  async create(data: note): Promise<note> {
    const persistenceModel = noteMapper.toPersistence(data);
    const createdEntity = new this.noteModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return noteMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<note[]> {
    const entityObjects = await this.noteModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      noteMapper.toDomain(entityObject),
    );
  }

  async findById(id: note['id']): Promise<NullableType<note>> {
    const entityObject = await this.noteModel.findById(id);
    return entityObject ? noteMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: note['id'][]): Promise<note[]> {
    const entityObjects = await this.noteModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      noteMapper.toDomain(entityObject),
    );
  }

  async update(
    id: note['id'],
    payload: Partial<note>,
  ): Promise<NullableType<note>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.noteModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.noteModel.findOneAndUpdate(
      filter,
      noteMapper.toPersistence({
        ...noteMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? noteMapper.toDomain(entityObject) : null;
  }

  async remove(id: note['id']): Promise<void> {
    await this.noteModel.deleteOne({ _id: id });
  }
}
