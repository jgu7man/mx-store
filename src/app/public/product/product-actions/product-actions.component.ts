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

  @Input() product: MxStoreProductModel
  constructor (
    public wishlist: WishlistService
  ) { }

  ngOnInit(): void {
  }

  get productOnCart() {
    var localCart: CartProductModel[] = JSON.parse( localStorage.getItem( 'gdev-cart' ) )
    if ( localCart ) {
      var product = localCart.find( prod => prod.productId == this.product.id )
      if ( product ) return product
    }
  }

}
