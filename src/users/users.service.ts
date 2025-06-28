import { Injectable } from '@nestjs/common';
import { StoreUserCategoriesDto } from './dto/user-categories.dto';
import {
  UserCategories,
  UserCategoriesDocument,
} from './schemas/user-categories.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserCategories.name)
    private userCategoriesModel: Model<UserCategoriesDocument>,
  ) {}

  async storeUserCategories(
    userId: string,
    storeUserCategoriesDto: StoreUserCategoriesDto,
  ): Promise<UserCategories> {
    const { categories } = storeUserCategoriesDto;

    return await this.userCategoriesModel.findOneAndUpdate(
      { userId },
      { categories },
      { upsert: true, new: true },
    );
  }

  async getUserCategories(userId: string): Promise<UserCategories | null> {
    return await this.userCategoriesModel.findOne({ userId }).exec();
  }
}
