import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderModel } from '../../public/cart/order.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { MxAlert } from '@marxa/devkit';

@Injectable( {
  providedIn: 'root'
} )
export class MxStoreOrdersService {

  pedidosList$ = new Observable<any[]>();
  pedidos$ = new BehaviorSubject<OrderModel[]>([])

  constructor (
    private fs: AngularFirestore,
    private _alert: MxAlert
  ) { }

  async getLista() {
    this.pedidosList$ =
    this.fs.collectionGroup( 'orders' ).valueChanges()

    this.pedidosList$.forEach( docs => {
      var pedidos: OrderModel[] = []

      docs.forEach( doc => {
        let order = doc as OrderModel
        order.pay_date = doc.pay_date.toDate()
        if ( order.ship_method == 'pickup' ) {
          order.pickup.pickup_date = doc.pickup.pickup_date.toDate()
        }
        if ( order.delivery.delivery_date ) {
          order.delivery.delivery_date = doc.delivery.delivery_date.toDate()
        }


        pedidos.push( order )
        this.pedidos$.next(pedidos)
      } )
    } )
  }



  async updatePedido(pedido: OrderModel) {
    this.fs.doc( `clientes/${ pedido.buyer.id }/orders/${ pedido.orderId }` ).ref
      .set( { ...pedido }, { merge: true } )
    .then(()=> this._alert.notify('Pedido actualizado'))
  }
}


