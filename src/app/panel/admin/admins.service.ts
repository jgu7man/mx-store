import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { AdminInterface, AdminRol } from './admin.model';
import { MxCache, MxErrorAlertModel } from '@marxa/devkit';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
// import firebase from 'firebase/app'
import { MainPanelService } from '../main-panel.service';
import { DatosContactoModel } from '../contacto/contacto.model';
import firebase from 'firebase/app'

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  store!: DatosContactoModel;

  admin$ = new Observable<any>();
  currentAdmin?: AdminInterface;
  admins$: Observable<AdminInterface[]> = new Observable();
  adminList: AdminInterface[] = [];

  roles: AdminRol[] = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'editor', viewValue: 'Editor' },
    { value: 'colab', viewValue: 'Colaborador' },
  ];

  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private _cache: MxCache,
    private router: Router,
    private _alert: MxAlert,
    private _main: MainPanelService
  ) {
    this.getAdmins();
    this.getCurrentAdmin();
    this.admin$ = this.auth.authState.pipe(
      switchMap((admin) => {
        return admin
          ? this.fs.doc<AdminInterface>(`admins/${admin.uid}`).valueChanges()
          : of(null);
      })
    );
  }

  getCurrentAdmin() {
    this.admin$.subscribe((admin) => {
      console.log(admin);
      if (!this.currentAdmin) throw new Error('No existe currentAdmin');
      this.currentAdmin = admin;
    });
  }

  get adminsRef() {
    return this.fs.collection('admins').ref;
  }

  async pretendCreateAdmin(admin: AdminInterface) {
    this.store = await this._main.getContactDatos();
    var adminFinded = this.adminList.find((a) => a.email == admin.email);

    if (adminFinded) {
      this._alert.message(
        'Este correo ya está en uso, por favor elige otro'
      );
    } else {
      this.adminsRef.doc(admin.email).set(admin);

      this.fs.collection('mails').ref.add({
        to: admin.email,
        message: {
          subject: 'Invitación a administrar ' + this.store.store_name,
          text: `Se te ha invitado a ser ${admin.rol} de ${this.store.store_name}\n
            Por favor da click en el siguiente enlace:\n
            https://${this.store.store_name}.web.app/panel/create`,
        },
      });

      this._alert.message('Se ha envido un correo al usuario nuevo');
    }
    return;
  }

  async createAdmin(email: string, password: string) {
    const admin: firebase.User = (await (
      await this.adminsRef.doc(email).get()
    ).data()) as firebase.User;

    if (!admin) {
      this._alert.message(
        'Lo sentimos, no esperamos una confirmación con esta dirección de email. Revisa que esté bien o itenta con otra. Si aún así no logras ingresar, ponte en contacto con un administrador del sitio'
      );
    } else {
      try {
        var nuevoAdmin = await this.auth.createUserWithEmailAndPassword(
          email,
          password
        );
        if (!nuevoAdmin.user) throw { message: 'No se creo el Usuario' };
        admin.uid = nuevoAdmin.user.uid;

        this.updateUserData(admin);
        this.adminsRef.doc(email).delete();

        this.router.navigate(['/panel']);
        return;
      } catch (error) {
        console.error(error);
        this.setErrorMsj(error);
      }
    }
  }

  async adminLogin(email: string, pwd: string) {
    try {
      var credential = await this.auth.signInWithEmailAndPassword(email, pwd);
      this.router.navigate(['/panel']);
      if (!credential.user) throw { message: 'No se encontro el usuario' };
      return this.updateUserData(credential.user);
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        this._alert.message('Correo electrónico no identificado');
      } else if (error.code === 'auth/wrong-password') {
        this._alert.message('Contraseña incorrecta');
      } else {
        this.setErrorMsj(error);
      }
    }
  }

  private async updateUserData({ uid, email, displayName }: firebase.User) {
    const adminRef: AngularFirestoreDocument<AdminInterface> = this.fs.doc(
      `admins/${uid}`
    );
    console.log({ uid, email });
    adminRef.set({ uid, email: email || '' }, { merge: true });
    this._cache.updateData('admin', { uid, email, displayName });
  }

  async updateAdmin(admin: AdminInterface) {
    this.fs.collection('admins').ref.doc(admin.uid).update(admin);
  }

  async changePassword(email: string) {
    this.auth.sendPasswordResetEmail(email).then(() => {
      this._alert.message(
        `Se ha enviado un correo a ${email} para confirmar el cambio`
      );
    });
  }

  getAdmins() {
    this.admins$ = this.fs.collection<AdminInterface>('admins').valueChanges();
    this.admins$.subscribe((res) => (this.adminList = res));
  }

  //? Cerrar sesión

  async singOut() {
    await this.auth.signOut();
    return this.router.navigate(['/']);
  }

  setErrorMsj(error: any) {
    let errorObj = new MxErrorAlertModel('', '', error.code);
    if (error.code.includes('not-found')) {
      errorObj.message = 'No se encontró el email';
    }
    if (error.code.includes('invalid')) {
      errorObj.message = 'Escribe una direccion de correo válida';
    }
    if (error.code.includes('wrong-password')) {
      errorObj.message = 'Contraseña incorrecta';
    }

    this._alert.error(errorObj.message, errorObj)
    // this._alert.errorAlert$.next(errorObj);
  }

  revokePermission(adminId: string) {
    this.fs.collection('admins').ref.doc(adminId).update({ rol: 'revoke' });
  }
}
