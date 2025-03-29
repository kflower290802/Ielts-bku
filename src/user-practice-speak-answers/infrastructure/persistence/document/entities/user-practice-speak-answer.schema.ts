import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserPracticeSchemaClass } from '../../../../../user-practices/infrastructure/persistence/document/entities/user-practice.schema';
import { PracticeSpeakingQuestionSchemaClass } from '../../../../../practice-speaking-questions/infrastructure/persistence/document/entities/practice-speaking-question.schema';

export type UserPracticeSpeakAnswerSchemaDocument =
  HydratedDocument<UserPracticeSpeakAnswerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userPracticeSpeakAnswer',
})
export class UserPracticeSpeakAnswerSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: UserPracticeSchemaClass.name,
  })
  userPractice: UserPracticeSchemaClass;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: PracticeSpeakingQuestionSchemaClass.name,
  })
  question: PracticeSpeakingQuestionSchemaClass;

  @Prop({ required: false, type: String, default: '' })
  answer: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserPracticeSpeakAnswerSchema = SchemaFactory.createForClass(
  UserPracticeSpeakAnswerSchemaClass,
);
