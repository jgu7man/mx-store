import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ClienteLoginService } from '../cliente-login.service';
import { Router } from '@angular/router';
import { ClienteModel } from '../../../../panel/clientes/cliente.model';
import { GdevLoginFields } from '../../../../../gdev-tools/gdev-login/components/login-card/login-card.component';
import { RestorePasswordComponent } from '../../../../../gdev-tools/gdev-login/components/restore-password/restore-password.component';

@Component({
  templateUrl: './popup-login.component.html',
  styleUrls: ['./popup-login.component.scss']
})
export class PopupLoginComponent implements OnInit {

  tabIndex: number = 0

  constructor (
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PopupLoginComponent>,
    @Inject( MAT_DIALOG_DATA ) public cliente: ClienteModel,
    public login: ClienteLoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onPasswordLoggin( login: GdevLoginFields ) {
    this.login.emailSingIn( login.email, login.password )
    .then(()=> this.dialogRef.close())
  }

  onRegistered(event) {
    this.tabIndex = 0
    this.dialogRef.close()
  }

  onLogged(event) {
    this.dialogRef.close()
  }

  logGoogle() {
    this.login.googleSingIn().then( () => {
      this.dialogRef.close()
    })
  }

  logFacebook() {
    this.login.facebookSingIn().then( () => {
      this.dialogRef.close()
    } )
  }

  restorePwd() {
    this.dialog.open( RestorePasswordComponent, {
      minWidth: 320
    })
  }

}
