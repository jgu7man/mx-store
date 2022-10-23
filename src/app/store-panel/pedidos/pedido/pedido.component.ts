import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SelectItem, MxText } from '@marxa/devkit';
import { OrderModel } from '../../../public/cart/order.model';
import { MxStoreOrdersService } from '../pedidos.service';
import { MailService } from '../../../panel/mails/mail.service';


@Component({
  selector: 'mx-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {


  estados: SelectItem[] = [
    { value: 'pendiente', viewValue: 'Pendiente' },
    { value: 'enviado', viewValue: 'Enviado' },
    { value: 'entregado', viewValue: 'Entregado' },
    { value: 'cancelado', viewValue: 'Cancelado' },
  ]

  ship_date: Date | null =null
  ship_time: string | null = null

  @Input() pedido?: OrderModel
  @Output() close = new EventEmitter<boolean>();

  constructor (
    public text: MxText,
    private _pedidos: MxStoreOrdersService,
    private _mails: MailService
  ) { }

  ngOnInit(): void {
  }

  fecha( date: Date ) {
    return this.text.stringifyDate( date )
  }

  hora( date: Date ) {
    return this.text.stringifyTime( date )
  }

  changeState() {
    if (!this.pedido) throw new Error( 'No existe pedido')
    this._pedidos.updatePedido( this.pedido )
    if ( this.pedido.state == 'enviado' ) {
      this._mails.sendClientMail(this.pedido.buyer!.email, 'sendingOrder')
    }
  }

  catchDeliveryDate( event: MatDatepickerInputEvent<Date> ) {
    if (!this.pedido) throw new Error( 'No existe pedido')
    this._pedidos.updatePedido( this.pedido )
  }

  catchDeliveryTime( event: any ) {
    if (!this.pedido) throw new Error( 'No existe pedido')
    var hours = +event.split( ':' )[ 0 ], mins = +event.split( ':' )[ 1 ];
    console.log( this.pedido.delivery?.delivery_date);

    if ( this.pedido.delivery?.delivery_date ) {
      this.pedido.delivery.delivery_date
        // .setHours( hours, mins )
    }

    this._pedidos.updatePedido(this.pedido)

  }


}
