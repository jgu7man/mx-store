import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminInterface } from './admin.model';
import { Observable } from 'rxjs';
import { AdminsService } from './admins.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';

@Component({
  selector: 'gdev-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  adminSelected?: AdminInterface
  @ViewChild( 'currentAdmin' ) itemPanel!: MatDrawer
  @ViewChild( 'listPanel' ) listPanel!: MatSelectionList


  constructor (
    public adminS: AdminsService,
    private _dialog: MatDialog,
  ) {
   this.adminS.getAdmins()
  }

  ngOnInit(): void {
  }

  onCloseColeccion() {
    this.itemPanel.close()
    this.listPanel.deselectAll()
    this.adminSelected = undefined
  }

  openAddDialog() {
    this._dialog.open( AddAdminComponent, {
      minWidth: 450,
    } )
  }

  openEditDialog(admin: AdminInterface) {
    this._dialog.open( EditAdminComponent, {
      minWidth: 450,
      data: admin
    })
  }


  onAdminSelected( selected: MatSelectionListChange ) {
    if ( this.itemPanel.opened ) { this.itemPanel.close() }
    this.adminSelected = selected.option.value
    this.itemPanel.open()
  }

}
