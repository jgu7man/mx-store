import { Component, Input, OnInit } from '@angular/core';
import { NavbarMenuNode } from 'src/app/gdev-tools/navbar/navbar.component';
import { NavbarService } from 'src/app/gdev-tools/navbar/navbar.service';
import { AdminsService } from '../admin/admins.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'gdev-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() appTitle: string = 'Gdev Store'
  @Input() menuStructure: NavbarMenuNode[]

  constructor (
    public login: AdminsService,
    public navbarService: NavbarService,
    public router: Router
  ) { 

    this.login.admin$.subscribe( admin => {
      if ( !admin ) { this.router.navigate(['/panel/login']) }
    })
  }

  async ngOnInit() {
  }
}


