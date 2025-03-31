import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserExamSchemaClass } from '../../../../../user-exams/infrastructure/persistence/document/entities/user-exam.schema';
import { ExamSpeakQuestionSchemaClass } from '../../../../../exam-speak-questions/infrastructure/persistence/document/entities/exam-speak-question.schema';

export type UserExamSpeakAnswerSchemaDocument =
  HydratedDocument<UserExamSpeakAnswerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userExamSpeakAnswer',
})
export class UserExamSpeakAnswerSchemaClass extends EntityDocumentHelper {
  @Prop({
    required: true,
    ref: UserExamSchemaClass.name,
    type: Types.ObjectId,
  })
  userExam: UserExamSchemaClass;

  @Prop({
    required: true,
    ref: ExamSpeakQuestionSchemaClass.name,
    type: Types.ObjectId,
  })
  question: ExamSpeakQuestionSchemaClass;

  @Prop({ required: false, type: String })
  answer: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserExamSpeakAnswerSchema = SchemaFactory.createForClass(
  UserExamSpeakAnswerSchemaClass,
);
