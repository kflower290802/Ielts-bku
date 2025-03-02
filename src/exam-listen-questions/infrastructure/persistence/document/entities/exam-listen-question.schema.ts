import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamListenSectionSchemaClass } from '../../../../../exam-listen-sections/infrastructure/persistence/document/entities/exam-listen-section.schema';
import { QuestionType } from '../../../../../utils/types/question.type';

export type ExamListenQuestionSchemaDocument =
  HydratedDocument<ExamListenQuestionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'examListenQuestion',
})
export class ExamListenQuestionSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true, type: String })
  question: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: ExamListenSectionSchemaClass.name,
  })
  examListenSection: ExamListenSectionSchemaClass;

  @Prop({
    required: true,
    enum: Object.values(QuestionType).map((type) => type),
    type: String,
  })
  type: QuestionType;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamListenQuestionSchema = SchemaFactory.createForClass(
  ExamListenQuestionSchemaClass,
);
