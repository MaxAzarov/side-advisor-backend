import { Controller, Post, Req, UseGuards, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { StoreUserCategoriesDto } from './dto/user-categories.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/:id/categories')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async getUserCategories(
    @Req() req: Request & { user: { email: string; userId: string } },
  ) {
    return await this.usersService.getUserCategories(req.user.userId);
  }
}
