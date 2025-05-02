import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { TopicSchemaClass } from '../../../../../topics/infrastructure/persistence/document/entities/topic.schema';
import { PracticeType } from '../../../../pratices.type';

export type PracticeSchemaDocument = HydratedDocument<PracticeSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'practice',
})
export class PracticeSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: TopicSchemaClass.name,
    required: true,
  })
  topic: TopicSchemaClass;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true, enum: Object.values(PracticeType) })
  type: PracticeType;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const PracticeSchema = SchemaFactory.createForClass(PracticeSchemaClass);
