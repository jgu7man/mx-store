import { Component, OnInit } from '@angular/core';
import { MxLoginFields } from '@marxa/auth';
import { AdminsService } from '../admin/admins.service';

@Component({
  selector: 'mx-login',
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

  onSubmit(fields: MxLoginFields) {
    this._admins.adminLogin(fields.email, fields.password)
  }

}
