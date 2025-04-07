import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type BlogSchemaDocument = HydratedDocument<BlogSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'blog',
})
export class BlogSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
  })
  content: string;

  @Prop({
    type: String,
    required: true,
  })
  image: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(BlogSchemaClass);
