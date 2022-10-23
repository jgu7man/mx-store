import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from 'src/app/public/wishlist/wishlist.service';
import { CartService } from '../../cart/cart.service';
import { MobileNavbarService } from 'src/app/public/tienda-navbar/mobile-navbar.service';
import { MxStorePublicService } from '../../mx-store-public.service';
import { MxSEO } from '@marxa/devkit';
import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';
import { Location } from '@angular/common';

@Component({
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  products: MxStoreProductModel[] = []
  categoria: string
  queryLimit: number = 12
  constructor (
    private _tienda: MxStorePublicService,
    private _ruta: ActivatedRoute,
    public wishlist: WishlistService,
    public cart: CartService,
    private navbar: MobileNavbarService,
    private seo: MxSEO,
    public location: Location
  ) {
    this.categoria = this._ruta.snapshot.params['catego']
    this.navbar.title = this.categoria
    this.seo.setTags( {
      title:this.categoria
    })
   }

  async ngOnInit() {
    this.products = await this._tienda.getArticulosFilter( this.categoria, this.queryLimit ) as MxStoreProductModel []
    console.log( this.products );
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
    var more = await this._tienda.getMoreProducts( this.categoria, this.queryLimit, lastId )
    more.forEach(product => this.products.push(product))
  }



}
