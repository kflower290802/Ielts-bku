import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { PracticeListenQuestionSchemaClass } from '../../../../../practice-listen-questions/infrastructure/persistence/document/entities/practice-listen-question.schema';

export type PracticeListenAnswerSchemaDocument =
  HydratedDocument<PracticeListenAnswerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'practiceListenAnswer',
})
export class PracticeListenAnswerSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: PracticeListenQuestionSchemaClass.name,
    required: true,
  })
  question: PracticeListenQuestionSchemaClass;

  @Prop()
  answer: string;

  @Prop({ type: Boolean })
  isCorrect: boolean;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const PracticeListenAnswerSchema = SchemaFactory.createForClass(
  PracticeListenAnswerSchemaClass,
);
