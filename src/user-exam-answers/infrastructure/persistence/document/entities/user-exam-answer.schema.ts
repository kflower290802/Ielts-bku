import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserExamSchemaClass } from '../../../../../user-exams/infrastructure/persistence/document/entities/user-exam.schema';
import { ExamPassageQuestionSchemaClass } from '../../../../../exam-passage-questions/infrastructure/persistence/document/entities/exam-passage-question.schema';

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
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: UserExamSchemaClass.name,
  })
  userExam: UserExamSchemaClass;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: ExamPassageQuestionSchemaClass.name,
  })
  examPassageQuestion: ExamPassageQuestionSchemaClass;

  @Prop({ required: false, type: mongoose.Schema.Types.Mixed, default: '' })
  answer: string | string[];

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserExamAnswerSchema = SchemaFactory.createForClass(
  UserExamAnswerSchemaClass,
);
