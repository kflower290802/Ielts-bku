import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserExamSchemaClass } from '../../../../../user-exams/infrastructure/persistence/document/entities/user-exam.schema';
import { ExamListenSectionSchemaClass } from '../../../../../exam-listen-sections/infrastructure/persistence/document/entities/exam-listen-section.schema';

export type UserExamListenAnswerSchemaDocument =
  HydratedDocument<UserExamListenAnswerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userExamListenAnswer',
})
export class UserExamListenAnswerSchemaClass extends EntityDocumentHelper {
  @Prop({
    required: true,
    ref: UserExamSchemaClass.name,
    type: mongoose.Types.ObjectId,
  })
  userExam: UserExamSchemaClass;

  @Prop({
    required: true,
    ref: ExamListenSectionSchemaClass.name,
    type: mongoose.Types.ObjectId,
  })
  examPassageQuestion: ExamListenSectionSchemaClass;

  @Prop({ required: false, type: mongoose.Schema.Types.Mixed, default: '' })
  answer: string | string[];

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserExamListenAnswerSchema = SchemaFactory.createForClass(
  UserExamListenAnswerSchemaClass,
);
