import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamPassageQuestionSchemaClass } from '../../../../../exam-passage-questions/infrastructure/persistence/document/entities/exam-passage-question.schema';

export type ExamPassageAnswerSchemaDocument =
  HydratedDocument<ExamPassageAnswerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'examPassageAnswer',
})
export class ExamPassageAnswerSchemaClass extends EntityDocumentHelper {
  @Prop({
    required: true,
    ref: ExamPassageQuestionSchemaClass.name,
    type: mongoose.Schema.Types.ObjectId,
  })
  question: ExamPassageQuestionSchemaClass;

  @Prop({ required: true })
  answer: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamPassageAnswerSchema = SchemaFactory.createForClass(
  ExamPassageAnswerSchemaClass,
);
