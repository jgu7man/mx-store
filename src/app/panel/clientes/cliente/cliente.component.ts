import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ClienteModel } from '../cliente.model';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'mx-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  @Input() cliente?: ClienteModel
  @Output() close = new EventEmitter<boolean>();

  constructor (
    public clienteS: ClientesService
  ) { }

  ngOnInit(): void {
  }

}
