import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClienteModel } from './cliente.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MxAlert } from '@marxa/devkit';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientes: ClienteModel[] = []
  clientesList$ = new Observable<any[]>()
  clientes$ = new BehaviorSubject<ClienteModel[]>([])


  constructor (
    private fs: AngularFirestore,
    private _alert: MxAlert
  ) { }

  async editCliente( cliente: ClienteModel ) {
    var object = {}
    cliente = { ...cliente, ...object }
    await this.fs.collection( 'cliente' ).ref.doc( cliente.idCliente ).update( cliente ).then( ref => {
      console.log( 'Cliente editado' );
    } )
  }


  getClientes() {
    this.clientesList$ =
      this.fs.collection<ClienteModel>( 'clientes' ).valueChanges()

    this.clientesList$.forEach( docs => {

      docs.forEach( doc => {
        var clientes: ClienteModel[] = []

        let client = doc as ClienteModel
        client.registrado = doc.registrado.toDate()


        clientes.push( client )
        this.clientes$.next( clientes )
      })
    } )
  }


  async getCliente( idKind: 'celular' | 'id' | 'email', id: string ) {
    const clientsRef = this.fs.collection( 'clientes' ).ref
    // var Doc = await clientsRef.where( 'celular', '==', id ).get()
    var clienteDoc,
      cliente: ClienteModel;


    if ( idKind == 'celular' ) {
      clienteDoc = await clientsRef.where( 'celular', '==', id ).get()
      if ( clienteDoc.size > 0 ) {
        cliente = clienteDoc.docs[ 0 ].data() as ClienteModel;
        return cliente
      }

    } else if ( idKind == 'email' ) {
      clienteDoc = await clientsRef.where( 'email', '==', id ).get()
      if ( clienteDoc.size > 0 ) {
        cliente = clienteDoc.docs[ 0 ].data() as ClienteModel;
        return cliente

      }

    } else {
      cliente = ( await clientsRef.doc( id ).get() ).data() as ClienteModel
      return cliente
    }

    return
  }

  async updateCliente(cliente: ClienteModel) {
    this.fs.doc( `clientes/${ cliente.idCliente }` ).ref
      .set( { ...cliente }, { merge: true } )
    .then(()=> this._alert.notify('Datos guardados'))
  }





  deleteCliente( id: string ) {
    this.fs.collection( 'clientes' ).ref.doc( id ).delete().then( res => {
      alert( 'cliente eliminado' )
    } )
  }

  async getAllClientes() {
    await this.fs.collection( 'clientes' ).ref.get().then( docs => {
      var clientes: any[] = [];
      docs.forEach( doc => { clientes.push( doc.data() ) } );
      this.clientes = clientes
    } );
    return this.clientes
  }
}
