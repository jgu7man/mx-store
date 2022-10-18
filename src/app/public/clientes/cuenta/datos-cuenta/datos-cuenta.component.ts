import { Component, OnInit, Input } from '@angular/core';
import { ClienteModel } from '../../../../panel/clientes/cliente.model';

@Component({
  templateUrl: './datos-cuenta.component.html',
  styleUrls: ['./datos-cuenta.component.scss']
})
export class DatosCuentaComponent implements OnInit {

  cliente: ClienteModel
  constructor() { }

  ngOnInit(): void {
    var cliente = JSON.parse(localStorage.getItem('gdev-cliente'))
    if (cliente) this.cliente = cliente
  }

}
