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

  cliente$: Observable<ClienteModel | undefined>
  public cliente?: ClienteModel
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
          return of( undefined );
        }
      } )
    )
  }

  async emailSingIn( email:string, pwd: string ) {
    try {
      var resp: any = await this.auth.signInWithEmailAndPassword( email, pwd )
      if (!resp && !resp.user) throw new Error( 'No se pudo iniciar sesión')

      var uid = resp.user.uid
      this.cliente = await this._clientes.getCliente( 'id', uid )
      console.log( this.cliente );

      if ( !this.cliente ) {
        this._alerts.message( 'Aún no eres cliente de esta tienda. Regístrate para acceder' )
      } else {
        localStorage.setItem( 'mx-store-cliente', JSON.stringify( this.cliente ) )
        if (!this.cliente.idCliente) throw new Error( 'No se pudo encontrar el cliernte')
        this._wishlist.updateOnlogin( this.cliente.idCliente )
        return true
      }
      return
    } catch( error: any ) {
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
      return
    }
  }


  async googleSingIn() {
    // Abre el popup de autenticación

    const provider = new firebase.auth.GoogleAuthProvider()
    var credential: any = await this.auth.signInWithPopup( provider )
    if (!credential && !credential.user) throw new Error( 'No se pudo iniciar sesión')
    var email = credential.user.email
    this.cliente = await this._clientes.getCliente( 'email', email )
    if ( this.cliente ) localStorage.setItem( 'mx-store-cliente', JSON.stringify( this.cliente ) )
    if (!this.cliente?.idCliente) throw new Error( 'No se pudo encontrar el cliernte')
    this._wishlist.updateOnlogin( this.cliente.idCliente )
    return true
  }

  async facebookSingIn() {
    // Abre el popup de autenticación
    const provider = new firebase.auth.FacebookAuthProvider();
    var credential: any = await this.auth.signInWithPopup( provider )
    var email = credential.user.email
    this.cliente = await this._clientes.getCliente( 'email', email )
    if ( this.cliente ) localStorage.setItem( 'mx-store-cliente', JSON.stringify( this.cliente ) )
    if (!this.cliente?.idCliente) throw new Error( 'No se pudo encontrar el cliernte')
    this._wishlist.updateOnlogin(this.cliente.idCliente)
    return true
  }


  async logOut() {
    this.auth.signOut()
    localStorage.removeItem( 'mx-store-cliente' )
    this.router.navigate( [ '/' ] )
  }



  async saveCliente( cliente: ClienteModel ) {

    if (!cliente.email) throw new Error( 'No se pudo encontrar el email' )
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

    return
  }

  async resgistAuthCliente(cliente: ClienteModel, idCliente?: string) {
    try {
      if ( !cliente.email ) throw new Error( 'No se pudo encontrar el emal' )
      if ( !cliente.contra ) throw new Error( 'No se pudo encontrar el emal' )

      var clienteNew = await this.auth
        .createUserWithEmailAndPassword( cliente.email, cliente.contra )

      console.log(clienteNew);
      if ( clienteNew ) {
        delete cliente.contra
        const clienteRef = this.fs.collection( 'clientes' ).ref

        if ( !idCliente ) {
          cliente.registrado = new Date()
          if (!clienteNew.user) throw new Error( 'No se pudo iniciar sesión')
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

      return
    }
    catch ( error: any ) {
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
            localStorage.setItem( 'mx-store-cliente', JSON.stringify( nuevoCliente ) );
           }

          this.router.navigate(['/'])
        }

      }
      return
    }
  }


  editPwd( email: string ) {
    this.auth.sendPasswordResetEmail( email )
      .then( res => {
        this._snack.open( 'Se ha enviado un email al admin para cambiar su contraseña' )
      } ).catch( error => {
        alert( error.message )
      } )
  }





}
