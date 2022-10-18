import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminInterface } from '../admin.model';
import { AdminsService } from '../admins.service';

@Component( {
  templateUrl: './edit-admin.component.html',
  styleUrls: [ './edit-admin.component.scss' ]
} )
export class EditAdminComponent implements OnInit {

  
  constructor (
    @Inject( MAT_DIALOG_DATA ) public admin: AdminInterface,
    public dialog: MatDialogRef<EditAdminComponent>,
    public adminS: AdminsService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.adminS.updateAdmin( this.admin )
    .then(()=> this.dialog.close())
  }

}
