import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WishlistProduct } from './wishlist-product.model';
import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';
import { MxLoading } from '@marxa/devkit';
import { ClienteModel } from '../../panel/clientes/cliente.model';
import { CartProductModel } from '../cart/cart-product.model';

@Injectable( {
  providedIn: 'root'
} )
export class WishlistService {

  wishlist: WishlistProduct[] = []

  constructor (
    private fs: AngularFirestore,
    private loading:MxLoading
  ) { }


  totalWishlistItems() {
    var wishlist = this.LocalWishlist
    if ( wishlist ) {
      return wishlist.length
    } else {
      return 0
    }
  }

  get LocalClient() {
    var cliente: ClienteModel = JSON.parse( localStorage.getItem( 'mx-store-cliente' )! )
    return cliente ? cliente : false
  }

  get LocalWishlist() {
    var localwish = JSON.parse( localStorage.getItem( 'mx-store-wishlist' )! )
    return localwish ? localwish : false
  }

  setLocalWishlist( wishlist: WishlistProduct[] ) {
    localStorage.setItem( 'mx-store-wishlist', JSON.stringify( wishlist ) )
  }

  async getWishlist() {
    if ( !this.LocalWishlist ) {
      // console.log('no hay localwishlist');
      if ( this.LocalClient ) {
        try {
          var tempWishlist: WishlistProduct[] = []
          var wishdocs = await this.fs
            .collection<WishlistProduct>(
              `clientes/${ this.LocalClient.idCliente }/wishlist`
            ).ref.get()

          if ( wishdocs.size > 0 ) {
            await this.loading.asyncForEach(
              wishdocs.docs, async ( doc ) => {
                tempWishlist.push( doc.data() )
            } )
            this.setLocalWishlist(tempWishlist)
            return this.wishlist = tempWishlist
          } else {
            return this.wishlist = []
          }
        } catch ( error ) {
          return this.wishlist = []
        }
      } else {
        return this.wishlist = []
      }
    } else {
      return this.wishlist = this.LocalWishlist
    }

  }

  async updateProduct( productId: string ) {
    await this.getWishlist()
    console.log(this.wishlist);
    var productIndex = this.wishlist.findIndex( prod => prod.productId == productId )
    console.log(productIndex);
    if ( productIndex > -1 ) {
      console.log('elimina del wish ', productId);
      this.wishlist.splice( productIndex, 1 )
      this.setLocalWishlist( this.wishlist )

      if ( this.LocalClient ) {
        await this.delProductOn( this.LocalClient.idCliente!, productId )
      }

    } else {
      console.log('agrega al wish ', productId);
      this.wishlist.push( {
        productId: productId,
        agregado: new Date(),
      } )
      this.setLocalWishlist( this.wishlist )
    }
    if ( this.LocalClient ) {
      await this.setProductOn( this.LocalClient.idCliente!, productId )
    }
  }

  private async setProductOn( idCliente: string, idProducto: string ) {
    try {
      const clienteRef = this.fs.collection( 'clientes' ).ref.doc( idCliente )
      const wishlistRef = clienteRef.collection( 'wishlist' )
      await wishlistRef.doc( idProducto ).set( {
        agregado: new Date(),
        productId: idProducto
      } )
      return true
    } catch ( error ) {
      console.error( 'No se agregó: ', error );
      return false
    }
  }

  private async delProductOn( idCliente: string, idProducto: string ) {
    try {
      const clienteRef = this.fs.collection( 'clientes' ).ref.doc( idCliente )
      const wishlistRef = clienteRef.collection( 'wishlist' )
      await wishlistRef.doc( idProducto ).delete()
      return true
    } catch ( error ) {
      console.error( 'No se agregó: ', error );
      return false
    }
  }

  checkOnWishlist( productId: string ) {
    var product = this.wishlist.find( prod => prod.productId == productId )
    return product ? product : false
  }

  async updateOnlogin( idCliente: string ) {
    await this.getWishlist()
    const wishlistRef = this.fs
      .collection<WishlistProduct>(
        `clientes/${idCliente}/wishlist`
      ).ref
    var wishlistDocs = await wishlistRef.get()

    var cloudWishlist:WishlistProduct[] = []
    if ( wishlistDocs.size > 0 ) {
      await this.loading.asyncForEach( wishlistDocs.docs,
        async ( doc ) => {
          cloudWishlist.push( doc.data() )
      } )



      if ( this.wishlist.length > 0 ) {
        await this.loading.asyncForEach( this.wishlist,
          async ( prod: WishlistProduct ) => {
            let Prod = cloudWishlist.find( p => p.productId == prod.productId )
            if ( !Prod ) this.setProductOn( idCliente, prod.productId )
        } )
        await this.loading.asyncForEach( cloudWishlist,
          async ( prod: WishlistProduct ) => {
            let Prod = this.wishlist.find( p => p.productId == prod.productId )
            if ( !Prod ) this.setProductOn( idCliente, prod.productId )
        })
        this.setLocalWishlist(this.wishlist)
      } else {
        this.setLocalWishlist( cloudWishlist )
      }



    } else {
      if ( this.wishlist.length > 0 ) {
        this.wishlist.forEach( prod => {
          this.setProductOn( idCliente, prod.productId)
        } )
      }



    }
  }


  async getWishlistProductFromDB( productId: string ) {
    var product =
    await this.fs.collection( `tienda/productos/referencias` ).ref
    .doc( productId ).get()
    return product.data() as CartProductModel
  }


  async getProductsInWishlist() {
    await this.getWishlist()
    var products: WishlistProduct[] = []
    await this.loading.asyncForEach( this.wishlist, async ( product: WishlistProduct ) => {
      const productCol = this.fs.collection( 'productos' ).ref
      const productDoc = await productCol.doc( product.productId ).get()
      product.description = productDoc.data() as MxStoreProductModel
      products.push( product )
    } )
    return products
  }


  async deleteOfWishlist(productId: string) {
    var productIndex = this.wishlist.findIndex( prod => prod.productId == productId )
    if ( productIndex > -1 ) {
      console.log( 'elimina del wish ', productId );
      this.wishlist.splice( productIndex, 1 )
      this.setLocalWishlist( this.wishlist )

      if ( this.LocalClient ) {
        await this.delProductOn( this.LocalClient.idCliente!, productId )
      }

    }
  }




}
