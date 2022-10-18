import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../cart/orders.service';
import { ActivatedRoute } from '@angular/router';
import { OrderModel } from '../cart/order.model';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MxText } from '@marxa/devkit';

@Component({
  selector: 'gdev-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  state: string = ''
  orders: OrderModel[] = []
  itemSelected?: OrderModel


  @ViewChild( 'currentItem' ) public itemPanel!: MatDrawer
  @ViewChild( 'listPanel' ) listPanel!: MatSelectionList


  constructor (
    private _orders: OrdersService,
    private _route: ActivatedRoute,
    private _text: MxText
  ) {
    this.state = this._route.snapshot.params[ 'state' ]
   }

  ngOnInit(): void {
    this.getOrdersByState()
  }

  async getOrdersByState() {
    let state = this.state.slice( 0, this.state.length - 1 )
    console.log( state );
    this.orders = await this._orders.getByState(state)
  }

  onClosePanel() {
    this.itemPanel.close()
    this.listPanel.deselectAll()
    this.itemSelected = undefined
  }


  onItemSelected( selected: MatSelectionListChange ) {
    if ( this.itemPanel.opened ) { this.itemPanel.close() }
    this.itemSelected = selected.option.value
    this.itemPanel.open()
  }

  fecha(date: Date) {
    return this._text.stringifyDate(date)
  }

  hora(date: Date) {
    return this._text.stringifyTime(date)
  }

}
