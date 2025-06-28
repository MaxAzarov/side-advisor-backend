import { IsArray, IsString } from 'class-validator';

export class StoreUserCategoriesDto {
  @IsArray()
  @IsString({ each: true })
  categories: string[];
}
