import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderModel } from './order.model';
import { ClienteModel } from '../../panel/clientes/cliente.model';
import { CartProductModel } from './cart-product.model';
import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';
import { DatosContactoModel } from 'src/app/panel/contacto/contacto.model';
import { MainPanelService } from 'src/app/panel/main-panel.service';
import { MailService } from 'src/app/panel/mails/mail.service';
import firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  cliente: ClienteModel
  store?: DatosContactoModel

  constructor (
    private fs: AngularFirestore,
    private _mails: MailService,
    private _main: MainPanelService
  ) {
    this.cliente = JSON.parse( localStorage.getItem( 'mx-store-cliente' )! );

  }



  get userOrderRef() {
    return this.fs.collection<OrderModel>(
      `clientes/${ this.cliente.idCliente }/orders`
    ).ref
  }

  get cartRef() {
    return this.fs.collection( `clientes/${ this.cliente.idCliente }/cart` ).ref
  }

  async saveOrder( order: OrderModel ) {
    this.store = await this._main.getContactDatos()
    order.pay_date = new Date()
    order.state = 'pendiente'
    try {
      console.log( order );
      this.dicountStock(order.products)
      this.userOrderRef.add( { ...order } )
        .then( order =>
          this.userOrderRef
            .doc( order.id )
            .update( { orderId: order.id } )
        );

      this._mails.sendAdminMail( 'newOrder' )
      this._mails.sendClientMail( order.buyer!.email, 'successOrder' )

      localStorage.removeItem( 'mx-store-order' )
      localStorage.removeItem( 'mx-store-cart' )
      let cartDocs = await this.cartRef.get()
      cartDocs.forEach( doc => { this.cartRef.doc( doc.id ).delete() })
      return
    } catch (error) {
      console.error(error);
    }
  }

  dicountStock( products: CartProductModel[] ) {
    const productsRef = this.fs.collection('tienda/productos/referencias').ref
    products.forEach( async p => {
      let prodDoc = await productsRef.doc( p.id ).get()
      let product = prodDoc.data() as MxStoreProductModel
      if ( product.stockCant ) {
        productsRef.doc(prodDoc.id).update({stockCant: product.stockCant - (p.cant || 0)})
      }
    })
  }

  async getUsersOrder() {
    const docs = await this.userOrderRef
      .orderBy( 'order_date', 'desc' ).get()

    var userOrders: OrderModel[] = []
    if ( docs.size > 0 ) {
      docs.forEach(doc => userOrders.push(doc.data() as OrderModel))
    }
    return userOrders
  }

  async getByState(state: string) {
    const docs = await this.userOrderRef
      .orderBy( 'order_date', 'desc' )
      .where('state', '==', state)
      .get()
    var userOrders: OrderModel[] = []
    if ( docs.size > 0 ) {
      docs.forEach( doc => {
        let order = doc.data() as OrderModel
        let pay_date = doc.data()['pay_date'] as firebase.firestore.Timestamp
        order.pay_date = pay_date.toDate()
        if ( order.delivery!.delivery_date ) {
          let delivery_date = doc.data()['delivery']!.delivery_date as firebase.firestore.Timestamp
          order.delivery!.delivery_date = delivery_date!.toDate()
        }
        if ( order.ship_method == 'pickup' ) {
          let pickup_date = doc.data()['pickup']!.pickup_date as firebase.firestore.Timestamp
          order.pickup!.pickup_date = pickup_date.toDate()
        }
        userOrders.push( order )
      } )
    }
    return userOrders
  }
}
