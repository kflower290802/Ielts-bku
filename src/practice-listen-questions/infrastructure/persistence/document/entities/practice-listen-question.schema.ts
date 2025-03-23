import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { PracticeListenTypeSchemaClass } from '../../../../../practice-listen-types/infrastructure/persistence/document/entities/practice-listen-type.schema';

export type PracticeListenQuestionSchemaDocument =
  HydratedDocument<PracticeListenQuestionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'practiceListenQuestion',
})
export class PracticeListenQuestionSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: PracticeListenTypeSchemaClass.name,
    required: true,
  })
  type: PracticeListenTypeSchemaClass;

  @Prop({ type: String, required: false, default: '' })
  question: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const PracticeListenQuestionSchema = SchemaFactory.createForClass(
  PracticeListenQuestionSchemaClass,
);
