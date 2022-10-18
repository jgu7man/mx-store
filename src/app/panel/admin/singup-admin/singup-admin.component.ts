import { Component, OnInit } from '@angular/core';
import { AdminsService } from '../admins.service';
// instalar auth
import { GdevLoginFields } from '../../../gdev-tools/gdev-login/components/login-card/login-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'gdev-singup-admin',
  templateUrl: './singup-admin.component.html',
  styleUrls: ['./singup-admin.component.scss']
})
export class SingupAdminComponent implements OnInit {

  currentYear = new Date().getFullYear()
  constructor (
    private _admins: AdminsService,
    private router: Router
  ) {
    this._admins.admin$.subscribe( admin => {
      if ( admin ) {
        this.router.navigate(['/panel'])
      }
    })
   }

  ngOnInit(): void {

  }

  onSubmit( fields: GdevLoginFields ) {
    this._admins.createAdmin( fields.email, fields.password )
  }


}
