import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type GrammarPointSchemaDocument =
  HydratedDocument<GrammarPointSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'grammarPoint',
})
export class GrammarPointSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const GrammarPointSchema = SchemaFactory.createForClass(
  GrammarPointSchemaClass,
);
