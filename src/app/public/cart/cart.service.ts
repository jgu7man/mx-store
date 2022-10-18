import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CartProductModel } from './cart-product.model';
import { MxLoading } from '@marxa/devkit';
import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';
import { ClienteModel } from '../../panel/clientes/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartProductModel[] = []

  constructor (
    private fs: AngularFirestore,
    private loading:MxLoading
  ) {
   }


  totalCartItems() {
    var cart = this.LocalCart
    if ( cart ) {
      var amount = cart.reduce( function ( a: number, b: CartProductModel ) {
        return b[ 'cant' ] == null ? a : a + b[ 'cant' ];
      }, 0 );
      return amount
    } else {
      return 0
    }
  }


  get LocalClient() {
    var cliente: ClienteModel = JSON.parse( localStorage.getItem( 'gdev-cliente' )! )
    return cliente ? cliente : false
  }

  get LocalCart() {
    var localCart = JSON.parse( localStorage.getItem( 'gdev-cart' )! )
    return localCart ? localCart : false
  }

  setLocalCart( cart: CartProductModel[] ) {
    // console.log(cart);
    localStorage.setItem( 'gdev-cart', JSON.stringify( cart ) )
  }

  async getCart(): Promise<CartProductModel[]> {
    if ( !this.LocalCart ) {

      if ( this.LocalClient ) {
        try {
          var tempCart: CartProductModel[] = []
          var cartdocs = await this.fs
            .collection<CartProductModel>(
              `clientes/${ this.LocalClient.idCliente }/cart`
            ).ref.get()

          if ( cartdocs.size > 0 ) {
            await this.loading.asyncForEach(
              cartdocs.docs, async ( doc ) => {
                tempCart.push( doc.data() )
            } )
            console.log( tempCart );
            this.setLocalCart(tempCart)
            return this.cart = tempCart
          } else {
            return this.cart = []
          }
        } catch ( error ) {
          return this.cart = []
        }
      } else {
        return this.cart = []
      }
    } else {
      console.log(this.LocalCart);
      return this.cart = this.LocalCart
    }

  }

  async updateProduct( product: CartProductModel, cant: number,  ) {
    // await this.getCart()
    // console.log(this.cart, {product, cant});
    var productIndex = this.cart.findIndex( Prod => Prod.productId == product.productId )

      if ( cant == 0 ) {
        // Si cantidad es 0 - elimina del cart
        // console.log('Elimina del cart');
        this.cart.splice( productIndex, 1 )
        this.setLocalCart( this.cart )
        if ( this.LocalClient ) {
          await this.delProductOn( this.LocalClient.idCliente!, product.productId! )
        }

      } else {

        product.cant = cant
        if ( productIndex == -1 ) {
          // Si no estaba en cart - agrega
          // console.log('Nuevo producto en cart');
          this.cart.push( product )
          this.setLocalCart( this.cart )
        } else {
          // actualiza
          // console.log('Actualiza cantidad');
          this.cart[ productIndex ] = product
          this.setLocalCart( this.cart )
        }

      }


    if ( this.LocalClient && cant ) {
      await this.setProductOn  ( this.LocalClient.idCliente!, product )
    }
  }

  private async setProductOn( idCliente: string, product: CartProductModel ) {
    try {
      const clienteRef = this.fs.collection( 'clientes' ).ref.doc( idCliente )
      const cartRef = clienteRef.collection( 'cart' )
      product.added = new Date()
      await cartRef.doc( product.productId ).set(product)
      return true
    } catch ( error ) { console.error( 'No se agregó: ', error );
      return false
    }
  }

  private async delProductOn( idCliente: string, productId: string) {
    try {
      const clienteRef = this.fs.collection( 'clientes' ).ref.doc( idCliente )
      const cartRef = clienteRef.collection( 'cart' )
      await cartRef.doc( productId ).delete()
      return true
    } catch ( error ) {
      console.error( 'No se eliminó: ', error );
      return false
    }
  }

  async checkOnCart( productId: string ) {
    this.getCart()
    var product = this.cart.find( prod => prod.productId == productId )
    return product ? product : false
  }

  async updateOnlogin( idCliente: string ) {
    await this.getCart()
    const cartRef = this.fs
      .collection<CartProductModel(
        `clientes/${ idCliente }/cart'`
      ).ref
    var cloudCart = await cartRef.get()

    var Cart: CartProductModel[] = []
    if ( cloudCart.size > 0 ) {

      await this.loading.asyncForEach( cloudCart.docs, async ( doc ) => {
        Cart.push( doc.data() )
      } )


      if ( this.cart.length > 0 ) {
        await this.loading.asyncForEach( this.cart,
          async ( prod: CartProductModel ) => {
            let Prod = Cart.find( cartProd => cartProd.productId == prod.productId )
            if ( Prod ) this.setProductOn( idCliente, prod )
          } )


        await this.loading.asyncForEach( Cart,
          async ( prod: CartProductModel ) => {
            let Prod = this.cart.find(cartProd => cartProd.productId == prod.productId )
            if ( Prod ) this.cart.push( prod )
        } )

        this.setLocalCart( this.cart )
      } else {
        this.setLocalCart( Cart )
      }



    } else {
      if ( this.cart.length > 0 ) {
        this.cart.forEach( prod => {
          this.setProductOn( idCliente, prod )
        } )
      }



    }
  }


  async getProductsInCart() {
    await this.getCart()
    var products: CartProductModel[] = []
    await this.loading.asyncForEach( this.cart, async ( product: CartProductModel ) => {
      const productCol = this.fs.collection( 'tienda/productos/referencias' ).ref
      const productDoc = await productCol.doc( product.productId ).get()
      product.description = productDoc.data() as MxStoreProductModel
      products.push( product )
    } )
    return products
  }
}
