import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';

export type ExamListenSectionSchemaDocument =
  HydratedDocument<ExamListenSectionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'examListenSection',
})
export class ExamListenSectionSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: ExamSchemaClass.name,
  })
  exam: ExamSchemaClass;

  @Prop({
    type: String,
    required: true,
  })
  audio: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamListenSectionSchema = SchemaFactory.createForClass(
  ExamListenSectionSchemaClass,
);
