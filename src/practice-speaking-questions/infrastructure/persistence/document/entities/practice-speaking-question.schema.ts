import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { PracticeSchemaClass } from '../../../../../practices/infrastructure/persistence/document/entities/practice.schema';

export type PracticeSpeakingQuestionSchemaDocument =
  HydratedDocument<PracticeSpeakingQuestionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'practiceSpeakingQuestion',
})
export class PracticeSpeakingQuestionSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true, type: String })
  audio: string;

  @Prop({ required: true, type: String })
  question: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: PracticeSchemaClass.name,
  })
  practice: PracticeSchemaClass;
  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const PracticeSpeakingQuestionSchema = SchemaFactory.createForClass(
  PracticeSpeakingQuestionSchemaClass,
);
