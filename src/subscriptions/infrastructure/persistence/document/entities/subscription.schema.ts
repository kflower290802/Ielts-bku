import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { SubscriptionPlan } from '../../../../subscription.type';

export type SubscriptionSchemaDocument =
  HydratedDocument<SubscriptionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'subscription',
})
export class SubscriptionSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, enum: SubscriptionPlan })
  plan: SubscriptionPlan;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(
  SubscriptionSchemaClass,
);
