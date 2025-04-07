import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import mongoose from 'mongoose';
import { TopicSchemaClass } from '../../../../../topics/infrastructure/persistence/document/entities/topic.schema';
import { BlogSchemaClass } from '../../../../../blogs/infrastructure/persistence/document/entities/blog.schema';

export type BlogTopicSchemaDocument = HydratedDocument<BlogTopicSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'blogTopic',
})
export class BlogTopicSchemaClass extends EntityDocumentHelper {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: TopicSchemaClass.name })
  topic: TopicSchemaClass;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: BlogSchemaClass.name })
  blog: BlogSchemaClass;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const BlogTopicSchema =
  SchemaFactory.createForClass(BlogTopicSchemaClass);
