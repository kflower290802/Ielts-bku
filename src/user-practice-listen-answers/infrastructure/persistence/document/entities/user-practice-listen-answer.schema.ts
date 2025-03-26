import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserPracticeSchemaClass } from '../../../../../user-practices/infrastructure/persistence/document/entities/user-practice.schema';
import { PracticeListenQuestionSchemaClass } from '../../../../../practice-listen-questions/infrastructure/persistence/document/entities/practice-listen-question.schema';

export type UserPracticeListenAnswerSchemaDocument =
  HydratedDocument<UserPracticeListenAnswerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userPracticeListenAnswer',
})
export class UserPracticeListenAnswerSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: UserPracticeSchemaClass.name,
  })
  userPractice: UserPracticeSchemaClass;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: PracticeListenQuestionSchemaClass.name,
  })
  question: PracticeListenQuestionSchemaClass;

  @Prop({ required: false, type: mongoose.Schema.Types.Mixed, default: '' })
  answer: string | string[];

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserPracticeListenAnswerSchema = SchemaFactory.createForClass(
  UserPracticeListenAnswerSchemaClass,
);
