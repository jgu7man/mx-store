import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProdDesc } from 'src/app/store-panel/products/product.model';
import { CartProductModel } from '../cart-product.model';
import { DinamicPriceService } from './dinamic-price.service';

@Component({
  selector: 'mx-dinamic-price',
  templateUrl: './dinamic-price.component.html',
  styleUrls: ['./dinamic-price.component.scss']
})
export class DinamicPriceComponent implements OnInit {

  @Input() productPrice: number = 0
  @Input() descuento: ProdDesc = {cant:0, exp:'', type:'%'}
  @Input() cantidad: number = 0
  @Input() productId?:string

  // cartProduct: CartProductModel
  cart: CartProductModel[] = []

  constructor (
    public priceS: DinamicPriceService
  ) {

   }

  ngOnInit(): void {
    // this.priceS.addons$.subscribe( list => {
    //   this.cartProduct.variante.addons = list
    // } )
    // this.priceS.variety$.subscribe(change => {
    //   this.cartProduct.variante.variety = change
    // } )
    // this.productOnCart()
  }

  inStock() {
    if ( this.priceS.product ) {
      if ( this.priceS.product.stockCant > 0 || this.priceS.product.onStock ) {
        return true
      } else { return false }
    } else { return false }

  }



}
