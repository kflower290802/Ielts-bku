import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { UserPracticeSchemaClass } from '../../../../../user-practices/infrastructure/persistence/document/entities/user-practice.schema';

export type UserPracticeSessionSchemaDocument =
  HydratedDocument<UserPracticeSessionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'userPracticeSession',
})
export class UserPracticeSessionSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: UserPracticeSchemaClass.name,
    required: true,
  })
  userPractice: UserPracticeSchemaClass;

  @Prop({ type: Date })
  startTime: Date;

  @Prop({ type: Date, required: false })
  endTime?: Date;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserPracticeSessionSchema = SchemaFactory.createForClass(
  UserPracticeSessionSchemaClass,
);
