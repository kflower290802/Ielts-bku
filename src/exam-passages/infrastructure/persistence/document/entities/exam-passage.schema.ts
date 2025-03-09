import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';
import { QuestionType } from '../../../../../utils/types/question.type';

export type ExamPassageSchemaDocument =
  HydratedDocument<ExamPassageSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'examPassage',
})
export class ExamPassageSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: ExamSchemaClass.name,
  })
  exam: ExamSchemaClass;

  @Prop()
  title: string;

  @Prop()
  passage: string;

  @Prop()
  type: QuestionType;

  @Prop({ required: false })
  blankPassage?: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamPassageSchema = SchemaFactory.createForClass(
  ExamPassageSchemaClass,
);
