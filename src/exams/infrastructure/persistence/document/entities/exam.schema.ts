import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ExamType } from '../../../../exams.type';

export type ExamSchemaDocument = HydratedDocument<ExamSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'exam',
})
export class ExamSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true })
  name: string;

  @Prop({
    enum: [
      ExamType.Listening,
      ExamType.Reading,
      ExamType.Writing,
      ExamType.Speaking,
    ],
    required: true,
  })
  type: ExamType;

  @Prop({ type: Number, required: true })
  time: number;

  @Prop({ required: true, type: Number })
  year: number;

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: false, type: String })
  audio?: string;
  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const examSchema = SchemaFactory.createForClass(ExamSchemaClass);
