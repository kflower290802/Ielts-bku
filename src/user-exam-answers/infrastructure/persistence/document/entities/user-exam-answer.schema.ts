import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type UserExamAnswerSchemaDocument =
  HydratedDocument<UserExamAnswerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userExamAnswer',
})
export class UserExamAnswerSchemaClass extends EntityDocumentHelper {
  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserExamAnswerSchema = SchemaFactory.createForClass(
  UserExamAnswerSchemaClass,
);
