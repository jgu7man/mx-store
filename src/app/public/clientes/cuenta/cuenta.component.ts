import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobileNavbarService } from 'src/app/public/tienda-navbar/mobile-navbar.service';
import { ClienteModel } from '../../../panel/clientes/cliente.model';
import { ClienteLoginService } from '../clientes-login/cliente-login.service';

@Component({
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  cliente: ClienteModel
  constructor (
    private router: Router,
    private navbar: MobileNavbarService,
    private login: ClienteLoginService
  ) {
    this.navbar.title = 'Cuenta'
   }

  ngOnInit(): void {
    this.login.cliente$.subscribe( cliente => {
      if ( cliente ) { this.cliente = cliente }
      else { this.router.navigate(['/tienda/login']) }
    })
  }

}
