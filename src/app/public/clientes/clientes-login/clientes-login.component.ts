import { Component, OnInit } from '@angular/core';
import { ClienteLoginService } from './cliente-login.service';
import { ClienteModel } from '../../../panel/clientes/cliente.model';
import { Router } from '@angular/router';
import { MxLoginFields } from '@marxa/auth';

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

  onSubmit(fields: MxLoginFields) {
    this.login.emailSingIn(fields.email, fields.password)
  }

}
