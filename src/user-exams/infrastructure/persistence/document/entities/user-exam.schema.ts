import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';
import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';

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
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: UserExamSchemaClass.name,
  })
  user: UserSchemaClass;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: ExamSchemaClass.name,
  })
  exam: ExamSchemaClass;

  @Prop()
  score: number;

  @Prop()
  progress: number;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserExamSchema = SchemaFactory.createForClass(UserExamSchemaClass);
