import { Component, OnInit, Input } from '@angular/core';
import { ClienteModel } from '../../../../panel/clientes/cliente.model';

@Component({
  templateUrl: './datos-cuenta.component.html',
  styleUrls: ['./datos-cuenta.component.scss']
})
export class DatosCuentaComponent implements OnInit {

  cliente?: ClienteModel
  constructor() { }

  ngOnInit(): void {
    let mxStoreCliente = localStorage.getItem( 'mx-store-cliente' )
    if (!mxStoreCliente) throw new Error( 'No se tiene el cliente')
    var cliente = JSON.parse(mxStoreCliente)
    if (cliente) this.cliente = cliente
  }

}
