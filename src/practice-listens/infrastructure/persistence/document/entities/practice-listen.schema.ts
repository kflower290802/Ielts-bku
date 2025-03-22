import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { PracticeSchemaClass } from '../../../../../practices/infrastructure/persistence/document/entities/practice.schema';

export type PracticeListenSchemaDocument =
  HydratedDocument<PracticeListenSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'practiceListen',
})
export class PracticeListenSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String })
  audio: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: PracticeSchemaClass.name,
  })
  practice: PracticeSchemaClass;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const PracticeListenSchema = SchemaFactory.createForClass(
  PracticeListenSchemaClass,
);
