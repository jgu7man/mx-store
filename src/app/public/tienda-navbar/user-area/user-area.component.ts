import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { WishlistService } from 'src/app/public/wishlist/wishlist.service';

@Component({
  selector: 'mx-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  constructor (
    public cart: CartService,
    public wish: WishlistService
  ) { }

  ngOnInit(): void {
  }

}
