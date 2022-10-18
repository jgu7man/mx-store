import { Injectable } from '@angular/core';
import { MainPanelService } from '../main-panel.service';
import { DatosContactoModel } from '../contacto/contacto.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { MailMessage, MailTemplate } from './mail.model';
import { MxAlert } from '@marxa/devkit';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  store: DatosContactoModel
  constructor (
    private _main: MainPanelService,
    private fs: AngularFirestore,
    private _alerts: MxAlert
  ) {
    this.store = new DatosContactoModel('')
  }

  get mail_templatesRef() {
    return this.fs.collection( 'mail_templates' ).ref
  }

  async sendAdminMail(
    subject: string | 'newOrder' | 'cancelRequest',
    message?: string ) {
    this.store = await this._main.getContactDatos()
    var templateDoc = await this.mail_templatesRef.doc( subject ).get()
    var template: MailTemplate = templateDoc.exists
      ? templateDoc.data() as MailTemplate
      : template = {
        to: this.store.email,
        subject: subject,
        text: message || ''
      }


    this.fs.collection( 'mails' ).add( {
      to: template.to,
      message: {
        subject: template.subject,
        text: template.text
      }
    } )
  }


  async sendClientMail(
    email:string,
    subject: string | 'successOrder' | 'sendingOrder',
    message?: string ) {
    var templateDoc = await this.mail_templatesRef.doc( subject ).get()
    var template: MailTemplate = templateDoc.exists
      ? templateDoc.data() as MailTemplate
      : template = {
        subject: subject,
        text: message || ''
      }


    this.fs.collection( 'mails' ).add( {
      to: email,
      message: {
        subject: template.subject,
        text: template.text
      }
    } )
  }





  async saveTemplate( templateName: string, template: MailTemplate ) {
    console.log({...template});
    await this.mail_templatesRef.doc( templateName ).set( { ...template }, { merge: true }
    ).then(() => this._alerts.notify('Plantilla guardada'))
  }


  async getTemplate( templateName: string ) {
    let template = await this.mail_templatesRef.doc( templateName ).get()
    return template.exists ? template.data() as MailTemplate : false
  }
}
