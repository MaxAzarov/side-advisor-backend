import { Controller, Post, Req, UseGuards, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { StoreUserCategoriesDto } from './dto/user-categories.dto';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserCategories } from './schemas/user-categories.schema';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/:id/categories')
  @ApiBody({
    type: StoreUserCategoriesDto,
    description: 'Store user categories',
    examples: {
      'Store user categories': {
        value: {
          categories: ['category1', 'category2'],
        },
      },
    },
  })
  @ApiOperation({ summary: 'Store user categories' })
  @ApiResponse({
    status: 200,
    description: 'User categories stored successfully',
    type: UserCategories,
  })
  async storeUserCategories(
    @Req() req: Request & { user: { email: string; userId: string } },
    @Body() storeUserCategoriesDto: StoreUserCategoriesDto,
  ) {
    return await this.usersService.storeUserCategories(
      req.user.userId,
      storeUserCategoriesDto,
    );
  }

  @Get('/:id/categories')
  @ApiResponse({
    status: 200,
    description: 'User categories fetched successfully',
    type: UserCategories,
  })
  @ApiOperation({ summary: 'Get user categories' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access.',
  })
  async getUserCategories(
    @Req() req: Request & { user: { email: string; userId: string } },
  ) {
    return await this.usersService.getUserCategories(req.user.userId);
  }
}
