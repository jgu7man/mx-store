import { Component, OnInit } from '@angular/core';
import { ClienteLoginService } from '../../../clientes-login/cliente-login.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(public auth: ClienteLoginService) { }

  ngOnInit() {
  }

}
