import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSelectionList } from '@angular/material/list';
import { Sort } from '@angular/material/sort';
import { MxText } from '@marxa/devkit';
import { ClienteModel } from './cliente.model';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'mx-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  itemSelected?: ClienteModel
  clientes!: ClienteModel[]

  @ViewChild( 'currentItem' ) public itemPanel!: MatDrawer
  @ViewChild( 'listPanel' ) listPanel!: MatSelectionList


  constructor (
    public clientesS: ClientesService,
    public text: MxText
  ) {
  }

  async ngOnInit() {
    this.clientesS.getClientes()
    this.clientesS.clientes$.subscribe( (clientes: any[]) => {
      this.clientes = clientes
    } )
  }

  sortData( sort: Sort ) {
    const data = this.clientes.slice();
    if ( !sort.active || sort.direction === '' ) {
      this.clientes = data;
      return;
    }

    this.clientes = data.sort( ( a, b ) => {
      const isAsc = sort.direction === 'asc';
      switch ( sort.active ) {
        case 'reg': return compare( a.registrado!.toString(), b.registrado!.toString(), isAsc );
        case 'name': return compare( a.nombre, b.nombre, isAsc );
        case 'email': return compare( a.email!, b.email!, isAsc );
        case 'celular': return compare( a.celular, b.celular, isAsc );
        default: return 0;
      }
    } );
  }



  onClosePanel() {
    this.itemPanel.close()
    this.itemSelected = undefined
  }


  onItemSelected( selected: ClienteModel ) {
    if ( this.itemPanel.opened ) { this.itemPanel.close() }
    this.itemSelected = selected
    this.itemPanel.open()
  }

}

function compare( a: number | string, b: number | string, isAsc: boolean ) {
  return ( a < b ? -1 : 1 ) * ( isAsc ? 1 : -1 );
}
