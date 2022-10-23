import { Component, OnInit } from '@angular/core';
import { MxStorePublicService } from '../../mx-store-public.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { MobileNavbarService } from 'src/app/public/tienda-navbar/mobile-navbar.service';
import { MxSEO } from '@marxa/devkit';
import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';
import { WishlistService } from 'src/app/public/wishlist/wishlist.service';

@Component({
  selector: 'mx-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.scss']
})
export class DestacadosComponent implements OnInit {

  products: MxStoreProductModel[] = []
  queryLimit: number = 8
  constructor (
    private _tienda: MxStorePublicService,
    private _ruta: ActivatedRoute,
    public wishlist: WishlistService,
    public cart: CartService,
    private navbar: MobileNavbarService,
    private seo: MxSEO
  ) { }

  async ngOnInit() {
    this.products = await this._tienda.getArticulosFilter( 'destacados', this.queryLimit ) as MxStoreProductModel[]
    // console.log(this.products);
    this.wishlist.getWishlist()
    this.cart.getCart()
  }

  get lastItem() {
    var products = this.products.length
    return products % this.queryLimit > 0 ? true : false
  }

  async loadMore() {
    var last = this.products[ this.products.length - 1 ]
    var lastId = last.id
    var more = await this._tienda.getMoreProducts( 'destacados', this.queryLimit, lastId )
    more.forEach( product => this.products.push( product ) )
  }

}
