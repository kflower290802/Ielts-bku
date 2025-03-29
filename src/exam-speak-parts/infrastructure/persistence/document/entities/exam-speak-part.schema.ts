import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument, SchemaTypes } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamSpeakSchemaClass } from '../../../../../exam-speaks/infrastructure/persistence/document/entities/exam-speak.schema';

export type ExamSpeakPartSchemaDocument =
  HydratedDocument<ExamSpeakPartSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'examSpeakPart',
})
export class ExamSpeakPartSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: ExamSpeakSchemaClass.name,
    required: true,
  })
  examSpeak: ExamSpeakSchemaClass;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExamSpeakPartSchema = SchemaFactory.createForClass(
  ExamSpeakPartSchemaClass,
);
