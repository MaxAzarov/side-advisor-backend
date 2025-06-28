import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserCategoriesDocument = UserCategories & Document;

@Schema({ timestamps: true })
export class UserCategories {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ type: [String], default: [] })
  categories: string[];
}

export const UserCategoriesSchema =
  SchemaFactory.createForClass(UserCategories);
