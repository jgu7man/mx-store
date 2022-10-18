import { Component, OnInit } from '@angular/core';
import { GdevLoginFields } from 'src/app/gdev-tools/gdev-login/components/login-card/login-card.component';
import { AdminsService } from '../admin/admins.service';

@Component({
  selector: 'gdev-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentYear = new Date().getFullYear()
  constructor (
    private _admins: AdminsService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(fields: GdevLoginFields) {
    this._admins.adminLogin(fields.email, fields.password)
  }

}
