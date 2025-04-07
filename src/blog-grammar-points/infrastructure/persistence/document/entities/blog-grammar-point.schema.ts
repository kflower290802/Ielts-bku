import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { BlogSchemaClass } from '../../../../../blogs/infrastructure/persistence/document/entities/blog.schema';
import { GrammarPointSchemaClass } from '../../../../../grammar-points/infrastructure/persistence/document/entities/grammar-point.schema';
export type BlogGrammarPointSchemaDocument =
  HydratedDocument<BlogGrammarPointSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'blogGrammarPoint',
})
export class BlogGrammarPointSchemaClass extends EntityDocumentHelper {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: BlogSchemaClass.name })
  blog: BlogSchemaClass;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: GrammarPointSchemaClass.name,
  })
  grammarPoint: GrammarPointSchemaClass;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const BlogGrammarPointSchema = SchemaFactory.createForClass(
  BlogGrammarPointSchemaClass,
);
