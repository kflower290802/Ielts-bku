import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { Exclude } from 'class-transformer';
import { SubscriptionSchemaClass } from '../../../../../subscriptions/infrastructure/persistence/document/entities/subscription.schema';

export type AccountSchemaDocument = HydratedDocument<AccountSchemaClass>;

export enum RoleEnum {
  Admin = 'Admin',
  Teacher = 'Teacher',
  Learner = 'Learner',
}

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'account',
})
export class AccountSchemaClass extends EntityDocumentHelper {
  @Prop({ required: false })
  username?: string;

  @Prop({ required: true, type: String })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Prop({
    type: String,
    enum: [RoleEnum.Admin, RoleEnum.Learner, RoleEnum.Teacher],
    default: RoleEnum.Learner,
  })
  role: RoleEnum;

  @Prop({
    type: [
      { type: mongoose.Types.ObjectId, ref: SubscriptionSchemaClass.name },
    ],
    default: [],
  })
  subscriptions: SubscriptionSchemaClass[];

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(AccountSchemaClass);
