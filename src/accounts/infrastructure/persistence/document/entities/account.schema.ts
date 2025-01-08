import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { Exclude } from 'class-transformer';

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
})
export class AccountSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, type: String })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Prop({
    type: String,
    enum: [RoleEnum.Admin, RoleEnum.Learner, RoleEnum.Teacher],
    default: RoleEnum.Learner,
  })
  role: RoleEnum;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(AccountSchemaClass);
