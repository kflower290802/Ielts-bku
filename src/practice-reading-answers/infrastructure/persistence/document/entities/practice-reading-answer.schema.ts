import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { PracticeReadingQuestionSchemaClass } from '../../../../../practice-reading-questions/infrastructure/persistence/document/entities/practice-reading-question.schema';

export type PracticeReadingAnswerSchemaDocument =
  HydratedDocument<PracticeReadingAnswerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'practiceReadingAnswer',
})
export class PracticeReadingAnswerSchemaClass extends EntityDocumentHelper {
  @Prop({
    required: true,
    ref: PracticeReadingQuestionSchemaClass.name,
    type: mongoose.Types.ObjectId,
  })
  question: PracticeReadingQuestionSchemaClass;

  @Prop({ required: true, type: String })
  answer: string;

  @Prop({ required: true, type: Boolean })
  isCorrect: boolean;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const PracticeReadingAnswerSchema = SchemaFactory.createForClass(
  PracticeReadingAnswerSchemaClass,
);
