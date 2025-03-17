import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamListenTypeSchemaClass } from '../../../../../exam-listen-types/infrastructure/persistence/document/entities/exam-listen-type.schema';

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
  @Prop({ required: false, type: String, default: '' })
  question: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: ExamListenTypeSchemaClass.name,
  })
  examListenType: ExamListenTypeSchemaClass;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamListenQuestionSchema = SchemaFactory.createForClass(
  ExamListenQuestionSchemaClass,
);
