import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from 'src/app/public/wishlist/wishlist.service';
import { CartService } from '../cart/cart.service';
import { MobileNavbarService } from 'src/app/public/tienda-navbar/mobile-navbar.service';
import { Location } from '@angular/common';
import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';
import { GdevStorePublicService } from '../gdev-store-public.service';
import { MxSEO } from '@marxa/devkit';

@Component({
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss']
})
export class ResultadosBusquedaComponent implements OnInit {

  products: MxStoreProductModel []
  categoria: string
  queryLimit: number = 12
  constructor (
    private _tienda: GdevStorePublicService,
    private _ruta: ActivatedRoute,
    public wishlist: WishlistService,
    public cart: CartService,
    private navbar: MobileNavbarService,
    private seo: MxSEO,
    public location: Location
  ) {
    this.navbar.title = 'Resultados'
    this.seo.generarTags( {
      title: 'Resultados de búsqueda'
    } )
  }

  async ngOnInit() {
    this.products = JSON.parse( sessionStorage.getItem('gdev-search')) as MxStoreProductModel []
    // console.log( this.products );
    this.wishlist.getWishlist()
    this.cart.getCart()
  }

  get lastItem() {
    var products = this.products.length
    return products % this.queryLimit > 0 ? true : false
  }



}
