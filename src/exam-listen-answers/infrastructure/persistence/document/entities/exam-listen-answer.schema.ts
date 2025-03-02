import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamListenQuestionSchemaClass } from '../../../../../exam-listen-questions/infrastructure/persistence/document/entities/exam-listen-question.schema';

export type ExamListenAnswerSchemaDocument =
  HydratedDocument<ExamListenAnswerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'examListenAnswer',
})
export class ExamListenAnswerSchemaClass extends EntityDocumentHelper {
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: ExamListenQuestionSchemaClass.name,
  })
  examListenQuestion: ExamListenQuestionSchemaClass;

  @Prop({ required: true })
  answer: string;

  @Prop({ default: false, required: false })
  isCorrect: boolean;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamListenAnswerSchema = SchemaFactory.createForClass(
  ExamListenAnswerSchemaClass,
);
