import { Component, OnInit } from '@angular/core';
import { MailMessage, MailModel, MailTemplate } from './mail.model';
import { MailService } from './mail.service';
import { AdminInterface } from '../admin/admin.model';
import { AdminsService } from '../admin/admins.service';

@Component({
  selector: 'gdev-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.scss']
})
export class MailsComponent implements OnInit {

  newOrder: MailTemplate
  successOrder: MailTemplate
  sendingOrder: MailTemplate
  cancelRequest: MailTemplate
    

  constructor (
    public mailS: MailService,
    public adminS: AdminsService 
  ) {
    this.newOrder = new MailTemplate('', '', '', '' )
    this.successOrder = new MailTemplate('', '', '','' )
    this.sendingOrder = new MailTemplate('', '', '','' )
    this.cancelRequest = new MailTemplate('', '', '','' )
   }

  ngOnInit() {
    this.mailS.getTemplate( 'newOrder' )
      .then( res => { if ( res ) this.newOrder = res } );
    this.mailS.getTemplate( 'successOrder' )
      .then( res => { if ( res ) this.successOrder = res } );
    this.mailS.getTemplate( 'sendingOrder' )
      .then( res => { if ( res ) this.sendingOrder = res } );
    this.mailS.getTemplate( 'cancelRequest' )
      .then( res => { if ( res ) this.cancelRequest = res } );
  }

  


}
