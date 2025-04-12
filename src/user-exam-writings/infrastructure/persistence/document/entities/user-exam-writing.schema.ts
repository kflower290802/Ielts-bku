import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument, Types } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserExamSchemaClass } from '../../../../../user-exams/infrastructure/persistence/document/entities/user-exam.schema';
import { ExamWritingSchemaClass } from '../../../../../exam-writings/infrastructure/persistence/document/entities/exam-writing.schema';

export type UserExamWritingSchemaDocument =
  HydratedDocument<UserExamWritingSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userExamWriting',
})
export class UserExamWritingSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true, type: Types.ObjectId, ref: UserExamSchemaClass.name })
  userExam: UserExamSchemaClass;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: ExamWritingSchemaClass.name,
  })
  examWriting: ExamWritingSchemaClass;

  @Prop({ required: false })
  answer: string;

  @Prop({ required: false })
  taskResponse?: number;

  @Prop({ required: false })
  coherenceAndCohesion?: number;

  @Prop({ required: false })
  lexicalResource?: number;

  @Prop({ required: false })
  grammaticalRangeAndAccuracy?: number;

  @Prop({ required: false })
  overallBandScore?: number;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserExamWritingSchema = SchemaFactory.createForClass(
  UserExamWritingSchemaClass,
);
