import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { LessonSchemaClass } from '../../../../../lessons/infrastructure/persistence/document/entities/lesson.schema';

export type FlashCardSchemaDocument = HydratedDocument<FlashCardSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'flashCard',
})
export class FlashCardSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lesson',
    required: true,
  })
  lesson: LessonSchemaClass;
  @Prop({ type: [{ front: String, back: String }] })
  cards: { front: string; back: string }[];

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const FlashCardSchema =
  SchemaFactory.createForClass(FlashCardSchemaClass);
