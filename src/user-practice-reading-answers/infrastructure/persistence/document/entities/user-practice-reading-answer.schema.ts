import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserPracticeSchemaClass } from '../../../../../user-practices/infrastructure/persistence/document/entities/user-practice.schema';
import { PracticeReadingQuestionSchemaClass } from '../../../../../practice-reading-questions/infrastructure/persistence/document/entities/practice-reading-question.schema';

export type UserPracticeReadingAnswerSchemaDocument =
  HydratedDocument<UserPracticeReadingAnswerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userPracticeReadingAnswer',
})
export class UserPracticeReadingAnswerSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: UserPracticeSchemaClass.name,
  })
  userPractice: UserPracticeSchemaClass;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: PracticeReadingQuestionSchemaClass.name,
  })
  question: PracticeReadingQuestionSchemaClass;

  @Prop({ required: false, type: mongoose.Schema.Types.Mixed, default: '' })
  answer: string | string[];

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserPracticeReadingAnswerSchema = SchemaFactory.createForClass(
  UserPracticeReadingAnswerSchemaClass,
);
