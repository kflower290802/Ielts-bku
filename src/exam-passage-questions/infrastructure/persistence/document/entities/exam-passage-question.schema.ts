import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamReadingTypeSchemaClass } from '../../../../../exam-reading-types/infrastructure/persistence/document/entities/exam-reading-type.schema';

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
    ref: ExamReadingTypeSchemaClass.name,
    required: true,
  })
  examReadingType: ExamReadingTypeSchemaClass;

  @Prop()
  question: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamPassageQuestionSchema = SchemaFactory.createForClass(
  ExamPassageQuestionSchemaClass,
);
