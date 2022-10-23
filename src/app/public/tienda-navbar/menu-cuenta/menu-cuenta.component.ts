import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../panel/clientes/clientes.service';
import { ClienteLoginService } from '../../clientes/clientes-login/cliente-login.service';

@Component({
  selector: 'app-menu-cuenta',
  templateUrl: './menu-cuenta.component.html',
  styleUrls: ['./menu-cuenta.component.css'],
})
export class MenuCuentaComponent implements OnInit {
  logged: boolean = false;
  rutasLogged: RUTA[] = [{ name: 'mi cuenta', route: 'tienda/cuenta' }];
  rutasUnlogged: RUTA[] = [{ name: 'inicar sesión', route: 'tienda/login' }];
  constructor(public authClientes: ClienteLoginService) {}

  async ngOnInit() {
    let mxStoreClient = localStorage.getItem( 'mx-store-client' )
    if (mxStoreClient) var user = JSON.parse(mxStoreClient);
    this.logged = user ? true : false;
  }
}

interface RUTA {
  name: string;
  route: string;
}
