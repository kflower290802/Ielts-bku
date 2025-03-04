import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';

export type ExamSpeakSchemaDocument = HydratedDocument<ExamSpeakSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'examSpeak',
})
export class ExamSpeakSchemaClass extends EntityDocumentHelper {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: ExamSchemaClass.name,
  })
  exam: ExamSchemaClass;

  @Prop({ required: true })
  audio: string;

  @Prop({ required: true })
  question: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamSpeakSchema =
  SchemaFactory.createForClass(ExamSpeakSchemaClass);
