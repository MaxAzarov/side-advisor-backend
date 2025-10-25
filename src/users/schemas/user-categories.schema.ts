import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserCategoriesDocument = UserCategories & Document;

@Schema({ timestamps: true })
export class UserCategories {
  @ApiProperty({
    description: 'User ID',
    example: '1234567890',
  })
  @Prop({ required: true, unique: true })
  userId: string;

  @ApiProperty({
    description: 'User categories',
    example: ['category1', 'category2'],
  })
  @Prop({ type: [String], default: [] })
  categories: string[];
}

export const UserCategoriesSchema =
  SchemaFactory.createForClass(UserCategories);
