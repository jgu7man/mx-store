import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClienteLoginService } from '../cliente-login.service';
import { ClienteModel } from '../../../../panel/clientes/cliente.model';
import { MxLoginFields } from '@marxa/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  cliente: ClienteModel
  @Output() getLogged: EventEmitter<any> = new EventEmitter()
  constructor (
    private _authCliente: ClienteLoginService
  ) {
    this.cliente = new ClienteModel( '', '' )
  }

  ngOnInit(): void {
  }

  onSubmit(fields: MxLoginFields) {
    this._authCliente.emailSingIn(fields.email, fields.password ).then( () => {
      this.getLogged.emit(true)
    })
  }

}
