import { Component, OnInit } from '@angular/core';
import { ClienteLoginService } from '../../../clientes/clientes-login/cliente-login.service';
import { MobileNavbarService } from '../../mobile-navbar.service';

@Component({
  selector: 'app-main-menu-mobile',
  templateUrl: './main-menu-mobile.component.html',
  styleUrls: ['./main-menu-mobile.component.css']
})
export class MainMenuMobileComponent implements OnInit {

  constructor (
    public auth: ClienteLoginService,
    public _navbar: MobileNavbarService
  ) { }

  ngOnInit() {
  }

}
