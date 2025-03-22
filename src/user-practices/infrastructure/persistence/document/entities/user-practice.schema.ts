import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';
import { PracticeSchemaClass } from '../../../../../practices/infrastructure/persistence/document/entities/practice.schema';

export type UserPracticeSchemaDocument =
  HydratedDocument<UserPracticeSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userPractice',
})
export class UserPracticeSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: UserSchemaClass.name,
  })
  user: UserSchemaClass;

  @Prop({
    ref: PracticeSchemaClass.name,
    required: true,
    type: mongoose.Types.ObjectId,
  })
  practice: PracticeSchemaClass;

  @Prop({
    required: false,
    type: Boolean,
    default: false,
  })
  isCompleted?: boolean;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserPracticeSchema = SchemaFactory.createForClass(
  UserPracticeSchemaClass,
);
