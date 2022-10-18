import { Component, OnInit } from '@angular/core';
import { WishlistService } from './wishlist.service';
import { WishlistProduct } from './wishlist-product.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  products: WishlistProduct[] = []
  constructor (
    public wishlist: WishlistService
  ) { }

  ngOnInit(): void {
    this.wishlist.getWishlist()
    this.getProducts()
  }

  async getProducts() {
    this.products = await this.wishlist.getProductsInWishlist()
  }

}
