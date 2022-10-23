import { Component, Input, OnInit } from '@angular/core';
import { AdminsService } from '../admin/admins.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SidenavNode } from '../models/sidenav.interface';
import { MxNavbarService } from '@marxa/navbar';
import { MxNavbarMenuNode } from '@marxa/navbar/lib/navlink.interface';

@Component({
  selector: 'mx-store-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() appTitle: string = 'Mx Store'
  @Input() menuStructure: MxNavbarMenuNode[] = []

  constructor (
    public login: AdminsService,
    public navbarService: MxNavbarService,
    public router: Router
  ) {

    this.login.admin$.subscribe( admin => {
      if ( !admin ) { this.router.navigate(['/panel/login']) }
    })
  }

  async ngOnInit() {
  }
}


