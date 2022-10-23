import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MxText } from '@marxa/devkit';
import { OrderModel } from '../../cart/order.model';
import firebase from 'firebase/app'

@Component({
  selector: 'mx-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {


  @Input() pedido?: OrderModel
  @Output() close = new EventEmitter<boolean>();

  constructor (
    private _text: MxText
  ) { }

  ngOnInit(): void {
  }

  fecha( date: Date | firebase.firestore.Timestamp ) {
    if ( date instanceof Date ) {
      return this._text.stringifyDate( date )
    } else {
      return this._text.stringifyDate( date.toDate() )
    }
  }

  hora( date: Date | firebase.firestore.Timestamp ) {
    if ( date instanceof Date ) {
      return this._text.stringifyDate( date )
    } else {
      return this._text.stringifyDate( date.toDate() )
    }
  }


}
