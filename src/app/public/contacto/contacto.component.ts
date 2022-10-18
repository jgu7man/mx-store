import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatosContactoModel } from 'src/app/panel/contacto/contacto.model';
import { ContactoForm } from './form-template/contacto.interface';
import { ClienteModel } from '../../panel/clientes/cliente.model';
import { MxAlert } from '@marxa/devkit';

@Component({
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  storeDatos: DatosContactoModel

  constructor (
    private fs: AngularFirestore,
    private _alerts: MxAlert
  ) {
    this.getStoreData()
   }

  ngOnInit(): void {




  }

  async getStoreData() {
    this.storeDatos = await (await this.fs.collection( 'gdev-store' ).ref.doc( 'datos_contacto' ).get()).data() as DatosContactoModel
  }


  async saveContact(datos: ContactoForm, medio) {
    const clienteFinded = await this.searchCliente( datos, medio );
    if ( !clienteFinded ) { this.createSuscriptor( datos, medio ) }
  }

  async searchCliente(datos: ContactoForm, medio) {
    const clientesRef = this.fs.collection('clientes').ref
    const clientesFinded = await clientesRef.where( 'email', '==', datos.email ).get()
    const clienteFinded = clientesFinded.size >= 1
    ? clientesFinded.docs[ 0 ]
    : undefined;

    if ( clienteFinded ) {
      const clienteRef = clientesRef.doc( clienteFinded.id ).collection( 'mensajes' );
      var mensaje = await clienteRef.add( { medio: medio, fecha: new Date() } )
    }

    return clienteFinded ? true : false

  }


  async createSuscriptor(datos: ContactoForm, medio) {
    const suscriptoresRef = this.fs.collection( 'suscriptores' ).ref

    const suscriptoresByEmail = await suscriptoresRef
      .where( 'email', '==', datos.email )
      .get();

    const suscriptoresByCel = await suscriptoresRef
      .where( 'celular', '==', datos.telefono )
      .get();

    const suscriptorFinded = suscriptoresByEmail.size >= 1
      ? suscriptoresByEmail.docs[ 0 ]
      : suscriptoresByCel.size >= 1
        ? suscriptoresByCel.docs[ 0 ]
        : undefined;


    if ( !suscriptorFinded ) {
      var nSuscriptor = await suscriptoresRef.add( {
      nombre: datos.nombre ? datos.nombre : '',
      email: datos.email ? datos.email : '',
      celular: datos.telefono ? datos.telefono : '',
      } )
    }


    const susId = suscriptorFinded
      ? suscriptorFinded.id
      : nSuscriptor.id

    suscriptoresRef.doc( susId ).collection( 'mensajes' )
      .add( { medio: medio, fecha: new Date() } )

  }



  async sendMessage( datos:ContactoForm, kind: 'whatsapp'|'email'|'messenger'|'instagram'|'skype' ) {

    this.saveContact( datos, kind )
    if ( kind == 'email' ) {
      var emailBody =
      {
        to: [this.storeDatos.email],
        message: {
          subject: `Recibiste un mensaje en tu tienda`,
          text: `
          Mensaje de ${ datos.nombre } - ${ datos.email}\n
          ${datos.telefono ? datos.telefono : ''}\n
          \n
          Mensaje: ${datos.mensaje}
          `,
        }
      }

    }


    switch (kind) {
      case 'whatsapp':
        window.open( `https://api.whatsapp.com/send?phone=${this.storeDatos.whatsapp}&text=Soy%20${datos.nombre},%20${datos.email ? 'mi email es '+datos.email:''},%20${datos.mensaje}`, 'blank')
        break;
      case 'messenger':
        window.open( `http://m.me/${this.storeDatos.facebook}?`, 'blank' )
        break;
      case 'email':
        this.fs.collection( 'mails' ).ref.add( emailBody ).then( () => {
          this._alerts.notify('Tu correo se ha envíado')
        })
        break;
      case 'skype':
        window.open( `skype:${this.storeDatos.skype}?chat`, 'blank' )
        break;

      default:
    }








  }

}
