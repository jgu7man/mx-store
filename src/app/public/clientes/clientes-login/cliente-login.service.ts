import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { ClientesService } from '../../../panel/clientes/clientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from 'src/app/public/wishlist/wishlist.service';
import { ClienteModel } from '../../../panel/clientes/cliente.model';
import { MxAlert } from '@marxa/devkit';

@Injectable({
  providedIn: 'root'
})
export class ClienteLoginService {

  cliente$: Observable<ClienteModel>
  public cliente: ClienteModel
  public clientes: any;
  constructor (
    private fs: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private _clientes: ClientesService,
    private _snack: MatSnackBar,
    private _wishlist: WishlistService,
    private _alerts: MxAlert
  ) {
    this.cliente = new ClienteModel( '', '', )
    this.cliente$ = this.auth.authState.pipe(
      switchMap( client => {
        if ( client ) {
          return this.fs.doc<ClienteModel>( `clientes/${ client.uid }` ).valueChanges()
        } else {
          return of( null );
        }
      } )
    )
  }

  async emailSingIn( email, pwd ) {
    try {
      var resp = await this.auth.signInWithEmailAndPassword( email, pwd )
      var uid = resp.user.uid
      this.cliente = await this._clientes.getCliente( 'id', uid )
      console.log( this.cliente );

      if ( !this.cliente ) {
        this._alerts.message( 'Aún no eres cliente de esta tienda. Regístrate para acceder' )
      } else {
        localStorage.setItem( 'gdev-cliente', JSON.stringify( this.cliente ) )
        this._wishlist.updateOnlogin( this.cliente.idCliente )
        return true
      }
    }
    catch( error ) {
      console.log( error )
      if ( error.code.includes( 'not-found' ) ) {
        this._snack.open( 'No se encontró el email' )
      }
      if ( error.code.includes( 'invalid' ) ) {
        this._snack.open( 'Escribe una direccion de correo válida' )
      }
      if ( error.code.includes( 'wrong-password' ) ) {
        this._snack.open( 'Contraseña incorrecta' )
      }
    }
  }


  async googleSingIn() {
    // Abre el popup de autenticación

    const provider = new firebase.auth.GoogleAuthProvider()
    var credential = await this.auth.signInWithPopup( provider )
    var email = credential.user.email
    this.cliente = await this._clientes.getCliente( 'email', email )
    if (this.cliente ) localStorage.setItem( 'gdev-cliente', JSON.stringify( this.cliente ) )
    this._wishlist.updateOnlogin( this.cliente.idCliente )
    return true
  }

  async facebookSingIn() {
    // Abre el popup de autenticación
    const provider = new firebase.auth.FacebookAuthProvider();
    var credential = await this.auth.signInWithPopup( provider )
    var email = credential.user.email
    this.cliente = await this._clientes.getCliente( 'email', email )
    if (this.cliente) localStorage.setItem( 'gdev-cliente', JSON.stringify( this.cliente ) )
    this._wishlist.updateOnlogin(this.cliente.idCliente)
    return true
  }


  async logOut() {
    this.auth.signOut()
    localStorage.removeItem( 'gdev-cliente' )
    this.router.navigate( [ '/' ] )
  }



  async saveCliente( cliente: ClienteModel ) {

    var clienteGuardado = await this._clientes.getCliente('email', cliente.email)

    console.log(clienteGuardado);
    if( !clienteGuardado) {
      this.resgistAuthCliente( cliente )
      return true
    } else {
      if ( clienteGuardado.email ) {
        this._snack.open('El cliente ya existe. Sólo debe iniciar sesión')
      } else {
        this.resgistAuthCliente(cliente, clienteGuardado.idCliente)
      }

    }
  }

  async resgistAuthCliente(cliente: ClienteModel, idCliente?) {
    try {
      var clienteNew = await this.auth
        .createUserWithEmailAndPassword( cliente.email, cliente.contra )

      console.log(clienteNew);
      if ( clienteNew ) {
        delete cliente.contra
        const clienteRef = this.fs.collection( 'clientes' ).ref

        if ( !idCliente ) {
          cliente.registrado = new Date()
          cliente.idCliente = clienteNew.user.uid
          clienteRef.doc(cliente.idCliente).set( cliente ).then( ref => {
            clienteRef.doc( cliente.idCliente ).update( { idCliente: cliente.idCliente } )
            console.log( 'cliente guardado' );
            this._snack.open('Listo! Te has registrado. Ahora inicia sesión')
          } )
        } else {
          await clienteRef.doc( idCliente ).update( cliente )
          console.log( 'cliente guardado' );
          return this._snack.open( 'Listo! Te has registrado. Ahora inicia sesión' )
        }
      } else {
        console.log('no se guardó');
      }
    }
    catch ( error ) {
      var errorCode = error.code;
      console.log( errorCode, error.message );
      if ( errorCode == 'auth/email-already-in-use' ) {
        var adminDoc = await this.fs.collection( 'admins' ).ref
          .where( 'email', '==', cliente.email ).get()

        let isAdmin = adminDoc.size > 0 ? true : false
        if ( !isAdmin ) {
          this._snack.open('Este correo ya está registrado, por favor usa otro')

        } else {
          var user = adminDoc.docs[ 0 ]
          let nuevoCliente = {
            celular: cliente.celular,
            email: cliente.email,
            idCliente: user.id,
            nombre: cliente.nombre,
            registrado: new Date()
          }


          if ( nuevoCliente ) {
            this.fs.collection( 'clientes' ).ref.doc( user.id ).set( nuevoCliente )
            localStorage.setItem( 'gdev-cliente', JSON.stringify( nuevoCliente ) );
           }

          this.router.navigate(['/'])
        }

      }
    }
  }


  editPwd( email ) {
    this.auth.sendPasswordResetEmail( email )
      .then( res => {
        this._snack.open( 'Se ha enviado un email al admin para cambiar su contraseña' )
      } ).catch( error => {
        alert( error.message )
      } )
  }





}
