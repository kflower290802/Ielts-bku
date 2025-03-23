import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { PracticeSchemaClass } from '../../../../../practices/infrastructure/persistence/document/entities/practice.schema';

export type PracticeWritingSchemaDocument =
  HydratedDocument<PracticeWritingSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'practiceWriting',
})
export class PracticeWritingSchemaClass extends EntityDocumentHelper {
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: PracticeSchemaClass.name,
  })
  practice: PracticeSchemaClass;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ required: false, type: String })
  image?: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const PracticeWritingSchema = SchemaFactory.createForClass(
  PracticeWritingSchemaClass,
);
