import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WishlistProduct } from '../wishlist-product.model';
import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';
import { WishlistService } from '../wishlist.service';
import { CartProductModel } from '../../cart/cart-product.model';

@Component({
  selector: 'app-product-on-wishlist',
  templateUrl: './product-on-wishlist.component.html',
  styleUrls: ['./product-on-wishlist.component.scss']
})
export class ProductOnWishlistComponent implements OnInit {

  private _product = new BehaviorSubject<WishlistProduct>( { productId: '', } )
  @Input() set product( product: WishlistProduct ) { this._product.next( product ) }
  get product() { return this._product.getValue() }
  producto?: CartProductModel

  @Output() precio_prod_total: EventEmitter<number> = new EventEmitter()

  constructor (
    private _wishlist: WishlistService
  ) { }

  ngOnInit(): void {
    this._product.subscribe( async prod => {
      // this.product = prod
      this.producto = await this._wishlist.getWishlistProductFromDB( prod.productId )
    } )
  }

  get productOnWishlist() {
    let wishlist = localStorage.getItem( 'mx-store-wishlist' )
    if (!wishlist) return null
    var localWishlist: WishlistProduct[] = JSON.parse( wishlist )
    var product = localWishlist.find( prod => prod.productId == this.product.productId )

    if ( product ) {
      if (product.agregado)
        product.agregado = new Date( product.agregado ).toLocaleDateString()
      return product
    }
    return null
  }

  deleteFromList() {
    if ( !this.product ) throw new Error( 'No existe el producto' )
    this._wishlist.deleteOfWishlist( this.producto!.id! )
  }

}
