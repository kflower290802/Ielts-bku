import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlashCardSchemaClass } from '../entities/flash-card.schema';
import { FlashCardRepository } from '../../flash-card.repository';
import { FlashCard } from '../../../../domain/flash-card';
import { FlashCardMapper } from '../mappers/flash-card.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class FlashCardDocumentRepository implements FlashCardRepository {
  constructor(
    @InjectModel(FlashCardSchemaClass.name)
    private readonly flashCardModel: Model<FlashCardSchemaClass>,
  ) {}

  async create(data: FlashCard): Promise<FlashCard> {
    const persistenceModel = FlashCardMapper.toPersistence(data);
    const createdEntity = new this.flashCardModel(persistenceModel);
    const entityObject = await createdEntity.save();
    const flashcard = FlashCardMapper.toDomain(entityObject);
    return flashcard;
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<FlashCard[]> {
    const entityObjects = await this.flashCardModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      FlashCardMapper.toDomain(entityObject),
    );
  }

  async findById(id: FlashCard['id']): Promise<NullableType<FlashCard>> {
    const entityObject = await this.flashCardModel.findById(id);
    return entityObject ? FlashCardMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: FlashCard['id'][]): Promise<FlashCard[]> {
    const entityObjects = await this.flashCardModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      FlashCardMapper.toDomain(entityObject),
    );
  }

  async update(
    id: FlashCard['id'],
    payload: Partial<FlashCard>,
  ): Promise<NullableType<FlashCard>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.flashCardModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.flashCardModel.findOneAndUpdate(
      filter,
      FlashCardMapper.toPersistence({
        ...FlashCardMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? FlashCardMapper.toDomain(entityObject) : null;
  }

  async remove(id: FlashCard['id']): Promise<void> {
    await this.flashCardModel.deleteOne({ _id: id });
  }
}
