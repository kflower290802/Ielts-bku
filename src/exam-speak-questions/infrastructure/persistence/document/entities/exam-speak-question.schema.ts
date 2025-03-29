import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamSpeakPartSchemaClass } from '../../../../../exam-speak-parts/infrastructure/persistence/document/entities/exam-speak-part.schema';

export type ExamSpeakQuestionSchemaDocument =
  HydratedDocument<ExamSpeakQuestionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'examSpeakQuestion',
})
export class ExamSpeakQuestionSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: ExamSpeakPartSchemaClass.name,
  })
  part: ExamSpeakPartSchemaClass;

  @Prop({ type: String, required: true })
  question: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamSpeakQuestionSchema = SchemaFactory.createForClass(
  ExamSpeakQuestionSchemaClass,
);
