import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderModel } from '../../cart/order.model';
import { TextService } from '../../../../gdev-tools/text/gdev-text.service';

@Component({
  selector: 'gdev-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  

  @Input() pedido: OrderModel
  @Output() close = new EventEmitter<boolean>();

  constructor (
    private _text: TextService
  ) { }

  ngOnInit(): void {
  }

  fecha( date ) {
    return this._text.stringifyDate( date )
  }

  hora( date ) {
    return this._text.stringifyTime( date )
  }


}
