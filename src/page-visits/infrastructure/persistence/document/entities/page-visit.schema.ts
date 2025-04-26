import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';

export type PageVisitSchemaDocument = HydratedDocument<PageVisitSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'pageVisit',
})
export class PageVisitSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
    required: false,
  })
  url?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: UserSchemaClass.name,
    required: false,
  })
  user?: UserSchemaClass;

  @Prop({
    type: String,
    required: false,
  })
  deviceType?: string; // 'mobile', 'tablet', 'desktop'

  @Prop({
    type: String,
    required: false,
  })
  browser?: string;

  @Prop({
    type: String,
    required: false,
  })
  os?: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const PageVisitSchema =
  SchemaFactory.createForClass(PageVisitSchemaClass);
