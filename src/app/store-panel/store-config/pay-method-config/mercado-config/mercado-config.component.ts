import { Component, OnInit, Input, Renderer2, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MercadopagoData } from '../pay-config.model';
import { PayMethodsService } from '../pay-methods.service';
import { DOCUMENT } from '@angular/common';
declare let mercadopago: any
// import postscribe from 'postscribe'
declare let postscribe: any
import { MxColor, MxLoading } from '@marxa/devkit';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PayStateComponent } from './pay-state/pay-state.component';

@Component({
  selector: 'mx-mercado-config',
  templateUrl: './mercado-config.component.html',
  styleUrls: ['./mercado-config.component.scss']
})
export class MercadoConfigComponent implements OnInit {

  private _data = new BehaviorSubject<MercadopagoData | null>(null)
  @Input() set data( d: MercadopagoData | null ) { this._data.next( d ); }
  get data() { return this._data.getValue() }

  mercadopagoForm: FormGroup
  token: string | null = null
  payId: string | null = null

  constructor (
    public payConfig_: PayMethodsService,
    private _color: MxColor,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _loading: MxLoading
  ) {
    console.log( this._route.snapshot.params )
    if ( this._route.snapshot.params[ 'state' ] ) {
      console.log( 'open dialog' )
      this._dialog.open( PayStateComponent, {
        width: '80%', data:this._route.snapshot.params[ 'state' ]
      })
    }
    this.mercadopagoForm = new FormGroup( {
      testAccessToken: new FormControl('', [Validators.required]),
      prodAccessToken: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
    this._data.subscribe( async data => {
      if ( data ) {
        this.mercadopagoForm.setValue( data )
        this.token = data.testAccessToken
      }
    } )
  }

  disableForm() {
		return this.mercadopagoForm.valid && !this.mercadopagoForm.pristine ? false : true;
  }

  saveData() {
    this.payConfig_.savePayConfig( { mercadopagoData: this.mercadopagoForm.value } )
    .then(() => {this.mercadopagoForm.markAsPristine({onlySelf: true})})
  }

  testPago() {
    console.log( 'test start' )
    this._loading.toggleWaiting(true)
    if ( !this.token ) throw { message: 'No existe el token'}
    this.payConfig_.testMercadopago( this.token )
      .then( ( result: any ) => {
        console.log( result )
        this.payId = result.data.response.id
        const script = `<script
        src="https://www.mercadopago.com.mx/integrations/v1/web-payment-checkout.js" data-preference-id="${this.payId }" data-header-color="${this._color.ColorPalette.main}" data-button-label="Ir a mercadopago" onmessage=${this.validatePaid()}"></script>`
        postscribe("#mercadopago", script)
        console.log( 'show modal' )
        this._loading.toggleWaiting(false)
      } )
    .catch(error => {console.log( error )})
  }

  validatePaid() {
    console.log( 'pagado' )
  }

}
