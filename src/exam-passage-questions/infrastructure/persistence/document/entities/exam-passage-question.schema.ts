import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamPassageSchemaClass } from '../../../../../exam-passages/infrastructure/persistence/document/entities/exam-passage.schema';

export type ExamPassageQuestionSchemaDocument =
  HydratedDocument<ExamPassageQuestionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'examPassageQuestion',
})
export class ExamPassageQuestionSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: ExamPassageSchemaClass.name,
    required: true,
  })
  examPassage: ExamPassageSchemaClass;

  @Prop()
  question: string;

  @Prop()
  answer: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamPassageQuestionSchema = SchemaFactory.createForClass(
  ExamPassageQuestionSchemaClass,
);
