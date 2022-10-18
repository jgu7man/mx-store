import { Component, OnInit, Input, Renderer2, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaypalData } from '../pay-config.model';
import { PayMethodsService } from '../pay-methods.service';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { MxLoading } from '@marxa/devkit';
declare var paypal: any

@Component({
  selector: 'mx-paypal-config',
  templateUrl: './paypal-config.component.html',
  styleUrls: ['./paypal-config.component.scss']
})
export class PaypalConfigComponent implements OnInit, AfterViewInit {

  private _data : BehaviorSubject<PaypalData> = new BehaviorSubject({sandboxClientID:'',liveClientID: '',});
  @Input() set data( d: PaypalData ) { this._data.next( d ); }
  get data() { return this._data.getValue() }
  @ViewChild('paypal', { static: true }) paypalElement?: ElementRef

  paypalForm: FormGroup;
	// this property can be make dynamically from your web api

	paidFor: boolean = false; //Payment Successful Message handling
	paypalConfig = {
		//Configuration for paypal Smart Button
		createOrder: (data: any, actions: any) => {
			return actions.order.create({
				purchase_units: [
					{
						description: "Pago de prueba",
						amount: {
							currency_code: "USD",
							value: 1.00,
						},
					},
				],
			});
		},
		onApprove: async (data: any, actions: any) => {
			const order = await actions.order.capture();
			this.paidFor = true;
			console.log(order);
		},
		onError: (err: any) => {
			console.log(err);
		},
	};

  constructor (
    public _payConfig: PayMethodsService,
    private _renderer: Renderer2,
    @Inject( DOCUMENT ) private _document: Document,
    private _loading: MxLoading
  ) {
    this.paypalForm = new FormGroup({
			sandboxClientID: new FormControl("", Validators.required),
			liveClientID: new FormControl("", Validators.required),
		});
   }

  ngOnInit(): void {
    this._data.subscribe( async data => {
      if ( data ) {
        this.paypalForm.setValue( data )
        this._loading.waitFor( 1000 )
        if ( this.paypalForm.value[ 'sandboxClientID' ] ) {
          console.log( 'render' )
          this.addScript()
        }
      }
    })
  }

  addScript() {
    return new Promise( ( resolve, reject ) => {
      let script = this._renderer.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${this.paypalForm.value[ 'sandboxClientID' ]}`;
      this._renderer.appendChild( this._document.head, script )
      script.onload = resolve
    })
  }

  createButton() {

    paypal.Buttons(this.paypalConfig).render("#paypal")
  }

  ngAfterViewInit() {
  }

  disableForm() {
		return this.paypalForm.valid && !this.paypalForm.pristine ? false : true;
	}

  saveData() {
    this._payConfig.savePayConfig( { paypalData: this.paypalForm.value } )
    .then(() => {this.paypalForm.markAsPristine({onlySelf: true})})
  }

  testMethod() {

  }

}
