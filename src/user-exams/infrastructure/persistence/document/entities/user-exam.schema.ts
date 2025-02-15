import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type UserExamSchemaDocument = HydratedDocument<UserExamSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userExam',
})
export class UserExamSchemaClass extends EntityDocumentHelper {
  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserExamSchema = SchemaFactory.createForClass(UserExamSchemaClass);
