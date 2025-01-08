import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';

import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { AccountSchemaClass } from '../../../../../accounts/infrastructure/persistence/document/entities/account.schema';

export type UserSchemaDocument = HydratedDocument<UserSchemaClass>;

export enum StatusEnum {
  Active = 'active',
  Inactive = 'inactive',
  Block = 'block',
}

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    unique: true,
  })
  phone: string | null;

  @Prop()
  password?: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'AccountSchemaClass' })
  account: AccountSchemaClass;

  @Prop()
  address: string;

  @Prop({
    type: String,
    enum: [StatusEnum.Active, StatusEnum.Block, StatusEnum.Inactive],
  })
  status: StatusEnum;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);
