import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { LessonType } from '../../../../lessons.type';

export type LessonSchemaDocument = HydratedDocument<LessonSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'lesson',
})
export class LessonSchemaClass extends EntityDocumentHelper {
  @Prop()
  name: string;

  @Prop()
  type: LessonType;

  @Prop({ required: false })
  videoId?: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const lessonSchema = SchemaFactory.createForClass(LessonSchemaClass);
