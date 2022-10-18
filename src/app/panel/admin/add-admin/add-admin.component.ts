import { Component, OnInit } from '@angular/core';
import { AdminInterface, AdminRol } from '../admin.model';
import { AdminsService } from '../admins.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MxAlert } from '@marxa/devkit';

@Component({
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  admin: AdminInterface = {
    displayName:'', email: '', password:''
  }



  constructor (
    public adminS: AdminsService,
    public dialog: MatDialogRef<AddAdminComponent>,
    private _alert: MxAlert,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.admin);
    this.adminS.pretendCreateAdmin( this.admin ).then( () => {
      this.dialog.close()
    } ).catch( error => {
      this._alert.error('Error al registrar el admin', error)
    })
  }

}
