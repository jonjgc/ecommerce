import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    isAdmin: boolean;
  };
}

@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findUserCart(@Request() req: AuthenticatedRequest) {
    return this.cartService.findUserCart(req.user.userId);
  }

  @Post('add')
  addItemToCart(
    @Request() req: AuthenticatedRequest,
    @Body() addItemDto: AddItemDto,
  ) {
    return this.cartService.addItemToCart(req.user.userId, addItemDto);
  }

  @Delete('remove/:productId')
  removeItemFromCart(
    @Request() req: AuthenticatedRequest,
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.cartService.removeItemFromCart(req.user.userId, productId);
  }
}
