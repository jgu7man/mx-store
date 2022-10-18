import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClienteLoginService } from '../../clientes-login/cliente-login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    public auth: ClienteLoginService,
    public location: Location
  ) {
   }

  ngOnInit() {
    let path = this.location.path().split('/')
    $("#"+path[2]).attr('aria-expanded', 'true')
  }

  onActive(path) {
    return this.location.path().includes(path)
  }



}
