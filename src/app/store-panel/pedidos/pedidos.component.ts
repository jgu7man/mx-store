import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MxText } from '@marxa/devkit';
import { OrderModel } from '../../public/cart/order.model';
import { MxStoreOrdersService } from './pedidos.service';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'mx-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  state: string
  pedidos: OrderModel[] = []
  itemSelected: OrderModel


  @ViewChild( 'currentItem' ) public itemPanel?: MatDrawer
  @ViewChild( 'listPanel' ) listPanel?: MatSelectionList


  constructor (
    public pedidosS: MxStoreOrdersService,
    private _route: ActivatedRoute,
    public text: MxText
  ) {
    this.state = this._route.snapshot.params[ 'state' ]
   }

  async ngOnInit() {
    this.pedidosS.getLista()
    this.pedidosS.pedidos$.subscribe( peds => {
      this.pedidos = peds
    } )
  }

  sortData( sort: Sort ) {
    const data = this.pedidos.slice();
    if ( !sort.active || sort.direction === '' ) {
      this.pedidos = data;
      return;
    }

    this.pedidos = data.sort( ( a, b ) => {
      const isAsc = sort.direction === 'asc';
      switch ( sort.active ) {
        case 'pay_date': return compare( a.pay_date.toString(), b.pay_date.toString(), isAsc );
        case 'buyer_name': return compare( a.buyer.name, b.buyer.name, isAsc );
        case 'state': return compare( a.state, b.state, isAsc );
        default: return 0;
      }
    } );
  }



  onClosePanel() {
    this.itemPanel!.close()
    this.itemSelected = undefined
  }


  onItemSelected( selected: OrderModel ) {
    if ( this.itemPanel!.opened ) { this.itemPanel!.close() }
    this.itemSelected = selected
    this.itemPanel!.open()
  }

  fecha(date: Date) {
    return this.text.stringifyDate(date)
  }

  hora(date: Date) {
    return this.text.stringifyTime(date)
  }

}

function compare( a: number | string, b: number | string, isAsc: boolean ) {
  return ( a < b ? -1 : 1 ) * ( isAsc ? 1 : -1 );
}
