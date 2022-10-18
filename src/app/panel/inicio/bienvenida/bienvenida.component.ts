import { Component, OnInit } from '@angular/core';
import { AdminsService } from '../../admin/admins.service';
import { AdminInterface } from '../../admin/admin.model';

@Component({
  selector: 'gdev-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {

  admin: AdminInterface
  constructor (
    public auth: AdminsService
  ) { }

  ngOnInit(): void {
    this.auth.admin$.subscribe(admin => this.admin = admin)
  }

}
