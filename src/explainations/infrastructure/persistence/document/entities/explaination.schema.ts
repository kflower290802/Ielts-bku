import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { ChoiceSchemaClass } from '../../../../../choices/infrastructure/persistence/document/entities/choice.schema';

export type ExplainationSchemaDocument =
  HydratedDocument<ExplainationSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'explaination',
})
export class ExplainationSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  doc: string;

  @Prop({ required: true, ref: ChoiceSchemaClass.name })
  choice: ChoiceSchemaClass;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ExplainationSchema = SchemaFactory.createForClass(
  ExplainationSchemaClass,
);
