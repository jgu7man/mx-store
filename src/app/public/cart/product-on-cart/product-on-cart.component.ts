import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProductModel } from '../cart-product.model';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';

@Component({
  selector: 'app-product-on-cart',
  templateUrl: './product-on-cart.component.html',
  styleUrls: ['./product-on-cart.component.scss']
})
export class ProductOnCartComponent implements OnInit {

  private _product = new BehaviorSubject<CartProductModel | undefined>( undefined )
  @Input() set product( product: CartProductModel | undefined) { this._product.next( product) }
  get product() { return this._product.getValue() }
  producto?: CartProductModel

  @Output() precio_prod_total: EventEmitter<number> = new EventEmitter()

  constructor (
    private _cart: CartService,
    private router: Router,
    private _alert: MxAlert
  ) { }

  ngOnInit(): void {
    this._product.subscribe(prod => this.producto = prod)
  }



  get productOnCart() {
    if ( !this.producto ) return null

    var localCart: CartProductModel[] = JSON.parse( localStorage.getItem( 'mx-store-cart' )! )
    if (!localCart) return null

    var product = localCart.find( prod => prod.id == this.product!.id )
    if ( product ) return product
    else return null
  }

  deleteProduct() {
    try {
      if (!this.product ) throw new Error( 'No se pudo eliminar')

      this._cart.updateProduct( this.product, 0 )
      this.router.navigateByUrl( 'tienda', { skipLocationChange: true } )
        .then(() => this.router.navigate(['tienda/cuenta/cart']))
    } catch (error: any) {
      this._alert.notify('No se pudo eliminar')
      return console.error(error)
    }
  }

}
