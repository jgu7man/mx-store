import { Component, OnInit } from '@angular/core';
import { ClienteLoginService } from './cliente-login.service';
import { ClienteModel } from '../../../panel/clientes/cliente.model';
import { GdevLoginFields } from '../../../../gdev-tools/gdev-login/components/login-card/login-card.component';
import { Router } from '@angular/router';

@Component({
  templateUrl: './clientes-login.component.html',
  styleUrls: ['./clientes-login.component.scss']
})
export class ClientesLoginComponent implements OnInit {

  cliente: ClienteModel
  constructor (
    public login: ClienteLoginService,
    private router: Router
  ) {
    this.cliente = new ClienteModel('','')
   }

  ngOnInit(): void {
    this.login.cliente$.subscribe( cliente => {
      if(cliente) this.router.navigate(['/tienda'])
    })
  }

  onSubmit(fields: GdevLoginFields) {
    this.login.emailSingIn(fields.email, fields.password)
  }

}
