import { Injectable } from '@angular/core';
import { Addon, MxStoreProductModel, ProdDesc } from 'src/app/store-panel/products/product.model';
import { CartService } from '../cart.service';
import { CartProductModel } from '../cart-product.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BehaviorSubject, AsyncSubject, Subscription, Subject } from 'rxjs';
import { MatRadioChange } from '@angular/material/radio';
import { MxAlert, MxLoading } from '@marxa/devkit';
import { distinctUntilKeyChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DinamicPriceService {

  cartProduct?: CartProductModel
  _product = new Subject<MxStoreProductModel >()
  product?: MxStoreProductModel
  prodSubs?: Subscription

  addonsSelected: Addon[] = []
  addonsRef: string[] = []

  prodDescuento?: ProdDesc
  prodPrice?: Addon

  constructor (
    private _cart: CartService,
    private _loading: MxLoading,
    private _alert: MxAlert
   ) {
    // this.cartProduct = {
    //   id: '',
    //   cant: 0,
    //   unit_precio: 0,
    //   variante: {},
    //   adiciones: [],
    // }
    // this.prodDescuento = { exp: '', type: '%', cant: 0 }
    this.initDATA()
  }



  // CREATE

  addProdCart() {
    console.log( this.cartProduct );
    if (!this.cartProduct) throw new Error( 'No existe producto que agregar')
    this._cart.updateProduct( this.cartProduct, 1 )
  }



  // READ Producto
  initDATA() {
    this.prodSubs = this._product.pipe(
      distinctUntilKeyChanged('id')
    ).subscribe( prod => {
      // console.log(prod);
      this.product = prod
      if (!prod.id) throw new Error( 'No existe el ID del producto')
      this._cart.checkOnCart( prod.id ).then( cProd => {
        // console.log(cProd);
        if ( cProd ) {
          // console.log(cProd);
          this.cartProduct = cProd
        }
      })

      this.cartProduct = {
        id: prod.id,
        description: prod,
        cant: 0,
        unit_precio: 0,
        variante: {},
        adiciones: [],
        added: new Date()
      }

      this.prodPrice = prod.variantes
        ? prod.variantes[ 0 ].variantes![ 0 ]
        : { precio: prod.precio }

      // console.log(this.prodPrice);
      this.prodDescuento = prod.descuento
        ?  prod.descuento
        : { exp: '', type: '%', cant: 0 }

    } )
  }

  unsubscribe() {
    // this.prodSubs.unsubscribe()
    delete this.cartProduct
  }

  get productOnCart() {
    var localCart: CartProductModel[] = JSON.parse(
      localStorage.getItem( 'mx-store-cart' )!
    )

    if ( this.cartProduct ) {
      if ( localCart ) {
        var product = localCart.find(
          prod => prod.id == this.cartProduct!.id
        )

        if ( product ) { return product }
      }
    }
    return null
  }




  // UPDATE

  async onAddonsChanges( change: MatCheckboxChange, value: Addon ) {
    try {
      if (!this.cartProduct) throw new Error( 'No se pudo agregar')
      if ( change.checked ) {
        this.addonsSelected.push( value )
        this.addonsRef.push(value.ref!)
      } else {
        let addon = this.addonsSelected.findIndex( a => a.ref == value.ref )
        this.addonsSelected.splice( addon, 1 )
        this.addonsRef.splice(addon, 1)
      }
      this.cartProduct.adiciones = this.addonsSelected
      if ( this.cartProduct.cant && this.cartProduct.cant > 0 ) {
        await this._loading.waitFor(1000)
        this._cart.updateProduct( this.cartProduct, this.cartProduct.cant )
      }
    } catch ( error: any ) {
      this._alert.notify( error.message )
      return console.error( error )
    }
  }




  async setVariety( variante: string, change: MatRadioChange ) {
    try {
      if ( !this.cartProduct ) throw new Error( 'No se pudo agregar' )

      this.prodPrice = change.value
      this.cartProduct.variante = {
        name: variante, option: change.value
      }
      if ( this.cartProduct.cant && this.cartProduct.cant > 0 ) {
        await this._loading.waitFor(1000)
        this._cart.updateProduct( this.cartProduct, this.cartProduct.cant )
      }
    } catch (error: any) {
      this._alert.notify( error.message )
      return console.error(error)
    }
  }



  async addCant() {
    try {
      if ( !this.cartProduct ) throw new Error( 'No se pudo agregar' )
      if ( this.productOnCart ) {
      this.cartProduct.cant = (this.productOnCart.cant || 0) + 1
      this._cart.updateProduct( this.cartProduct, this.cartProduct.cant )
    }
    } catch (error: any) {
      this._alert.notify( error.message )
      return console.error(error)
    }
  }


  // DELETE
  async removeCant() {
    try {
      if ( !this.cartProduct ) throw new Error( 'No se pudo eliminar' )
      if ( this.productOnCart ) {
      this.cartProduct.cant = (this.productOnCart.cant || 0) - 1
      this._cart.updateProduct( this.cartProduct, this.cartProduct.cant )
    }
    } catch (error: any) {
      this._alert.notify( error.message )
      return console.error(error)
    }
  }



  get total_price() {

    if ( !this.cartProduct ) return 0

    const hoy = new Date()
    var addons = 0, descuento = 0,
      cantidad = this.cartProduct.cant ? this.cartProduct.cant : 1;

    if ( this.addonsSelected.length > 0 ) {
      addons = this.addonsSelected.reduce( ( a, b ) => a + ( b.precio || 0 ), 0 )
    }

    if ( hoy < this.prodDescuento!.exp ) {

      descuento = this.prodDescuento!.type == '%'
        ? (this.prodPrice?.precio || 0) * ( (this.prodDescuento?.cant || 0) * .01 )
        : (this.prodPrice?.precio || 0) -(this.prodDescuento?.cant || 0)
    }

    // console.log( this.prodPrice.precio );
    // console.log( descuento );
    // console.log(addons);

    this.cartProduct.unit_precio = ( (this.prodPrice?.precio || 0) - descuento ) + addons
    var sumPrice = this.cartProduct.unit_precio * cantidad
    // console.log(sumPrice);
    var total = this.decimalRound( sumPrice )
    // console.log( total );
    return total

  }

  decimalRound( number: number ) {
    let string = number.toString()
    let parts = string.split( '.' )
    let decimal = parts.length > 1 ? +parts[ 1 ].slice( 0, 1 ) : 0
    let cant = `${ parts[ 0 ] }.${ decimal }`
    return cant
  }


}
