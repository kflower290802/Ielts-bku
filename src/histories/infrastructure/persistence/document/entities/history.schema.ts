import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type HistorySchemaDocument = HydratedDocument<HistorySchemaClass>;

export enum HistoryStatus {
  Active = 'active',
  Inactive = 'inactive',
}

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'history',
})
export class HistorySchemaClass extends EntityDocumentHelper {
  @Prop({
    required: true,
    enum: [HistoryStatus.Active, HistoryStatus.Inactive],
  })
  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  score: number;

  status: HistoryStatus;
  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const HistorySchema = SchemaFactory.createForClass(HistorySchemaClass);
