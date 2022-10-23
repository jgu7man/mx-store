import { Component, OnInit, Input } from '@angular/core';
import { WishlistService } from 'src/app/public/wishlist/wishlist.service';
import { CartProductModel } from '../../cart/cart-product.model';
import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.scss']
})
export class ProductActionsComponent implements OnInit {

  @Input() product?: MxStoreProductModel
  constructor (
    public wishlist: WishlistService
  ) { }

  ngOnInit(): void {
  }

  get productOnCart() {
    try {
      let mxStoreCart = localStorage.getItem( 'mx-store-cart' )
      if (!mxStoreCart) throw new Error('No existe cart en el caché')
      var localCart: CartProductModel[] = JSON.parse( mxStoreCart )

      if (!this.product) throw new Error('No se encontró producto')
      var product = localCart.find( prod => prod.id == this.product!.id )
      if ( !product ) throw new Error('No existe producto')
      return product
    } catch ( error: any ) {
      return console.error( error )
    }
  }

}
