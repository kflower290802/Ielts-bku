import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserPracticeSchemaClass } from '../../../../../user-practices/infrastructure/persistence/document/entities/user-practice.schema';

export type UserPracticeWritingAnswerSchemaDocument =
  HydratedDocument<UserPracticeWritingAnswerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userPracticeWritingAnswer',
})
export class UserPracticeWritingAnswerSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: UserPracticeSchemaClass.name,
    required: true,
  })
  userPractice: UserPracticeSchemaClass;

  @Prop({ type: String })
  answer: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserPracticeWritingAnswerSchema = SchemaFactory.createForClass(
  UserPracticeWritingAnswerSchemaClass,
);
