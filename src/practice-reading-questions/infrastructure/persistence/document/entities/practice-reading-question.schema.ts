import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { PracticeReadingTypeSchemaClass } from '../../../../../practice-reading-types/infrastructure/persistence/document/entities/practice-reading-type.schema';

export type PracticeReadingQuestionSchemaDocument =
  HydratedDocument<PracticeReadingQuestionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'practiceReadingQuestion',
})
export class PracticeReadingQuestionSchemaClass extends EntityDocumentHelper {
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: PracticeReadingTypeSchemaClass.name,
  })
  type: PracticeReadingTypeSchemaClass;

  @Prop({ required: true, type: String })
  question: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const PracticeReadingQuestionSchema = SchemaFactory.createForClass(
  PracticeReadingQuestionSchemaClass,
);
