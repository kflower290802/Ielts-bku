import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GrammarPointSchemaClass } from '../entities/grammar-point.schema';
import { GrammarPointRepository } from '../../grammar-point.repository';
import { GrammarPoint } from '../../../../domain/grammar-point';
import { GrammarPointMapper } from '../mappers/grammar-point.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class GrammarPointDocumentRepository implements GrammarPointRepository {
  constructor(
    @InjectModel(GrammarPointSchemaClass.name)
    private readonly grammarPointModel: Model<GrammarPointSchemaClass>,
  ) {}

  async create(data: GrammarPoint): Promise<GrammarPoint> {
    const persistenceModel = GrammarPointMapper.toPersistence(data);
    const createdEntity = new this.grammarPointModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return GrammarPointMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<GrammarPoint[]> {
    const entityObjects = await this.grammarPointModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      GrammarPointMapper.toDomain(entityObject),
    );
  }

  async findById(id: GrammarPoint['id']): Promise<NullableType<GrammarPoint>> {
    const entityObject = await this.grammarPointModel.findById(id);
    return entityObject ? GrammarPointMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: GrammarPoint['id'][]): Promise<GrammarPoint[]> {
    const entityObjects = await this.grammarPointModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      GrammarPointMapper.toDomain(entityObject),
    );
  }

  async update(
    id: GrammarPoint['id'],
    payload: Partial<GrammarPoint>,
  ): Promise<NullableType<GrammarPoint>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.grammarPointModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.grammarPointModel.findOneAndUpdate(
      filter,
      GrammarPointMapper.toPersistence({
        ...GrammarPointMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? GrammarPointMapper.toDomain(entityObject) : null;
  }

  async remove(id: GrammarPoint['id']): Promise<void> {
    await this.grammarPointModel.deleteOne({ _id: id });
  }

  async findAll(): Promise<GrammarPoint[]> {
    const entityObjects = await this.grammarPointModel.find();
    return entityObjects.map((entityObject) =>
      GrammarPointMapper.toDomain(entityObject),
    );
  }
}
