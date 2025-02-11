import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { BlogSchemaClass } from '../../../../../blogs/infrastructure/persistence/document/entities/blog.schema';
import { LessonSchemaClass } from '../../../../../lessons/infrastructure/persistence/document/entities/lesson.schema';

export type BlogLessonSchemaDocument = HydratedDocument<BlogLessonSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'blogLesson',
})
export class BlogLessonSchemaClass extends EntityDocumentHelper {
  @Prop({
    ref: 'lesson',
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  })
  lesson: LessonSchemaClass;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'blog',
    required: true,
  })
  blog: BlogSchemaClass;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const BlogLessonSchema = SchemaFactory.createForClass(
  BlogLessonSchemaClass,
);
