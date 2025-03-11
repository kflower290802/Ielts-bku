import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';

export type ExamWritingSchemaDocument =
  HydratedDocument<ExamWritingSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'examWriting',
})
export class ExamWritingSchemaClass extends EntityDocumentHelper {
  @Prop({ type: Types.ObjectId, ref: ExamSchemaClass.name, required: true })
  exam: ExamSchemaClass;

  @Prop()
  content: string;

  @Prop({ required: false })
  image?: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamWritingSchema = SchemaFactory.createForClass(
  ExamWritingSchemaClass,
);
