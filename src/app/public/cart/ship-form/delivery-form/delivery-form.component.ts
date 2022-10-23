import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DeliveryAddress, OrderModel } from '../../order.model';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OrdersService } from '../../orders.service';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent implements OnInit {

  delivery: FormGroup
  required: FormControl = new FormControl( '', [ Validators.required ] )
  @Output() formChanges: EventEmitter<any> = new EventEmitter()
  constructor (
    private formBuilder: FormBuilder,
    private _orders: OrdersService
  ) {
    this.delivery = this.formBuilder.group( {
      address: new FormControl('', [Validators.required ]),
      depto: new FormControl('', [Validators.required ]),
      city: new FormControl('', [Validators.required ]),
      state: new FormControl('', [Validators.required ]),
      country: new FormControl( '', [ Validators.required ] ),
    })
   }

  ngOnInit(): void {
    this.listenFormChanges()
    this.getLastOrder()
  }

  async getLastOrder() {
    var orders = await this._orders.getUsersOrder()
    if ( orders.length > 0 ) {
      let lastOrder: OrderModel = orders[0]

      this.delivery.setValue( {
        address:lastOrder.delivery!.address,
          depto:lastOrder.delivery!.depto,
        city:lastOrder.delivery!.city,
          state: lastOrder.delivery!.state,
        country:lastOrder.delivery!.country
      })

    }
  }

  listenFormChanges() {
    this.delivery.valueChanges.subscribe( changes => {
      console.log( changes );
      console.log();
      this.formChanges.emit( {delivery: changes, invalid:this.delivery.invalid} )
    })
  }

  requiredMessage() {
    return this.required.hasError('required') ? 'Este campo es necesario' : ''
  }

  onSubmit() {
    localStorage.setItem( 'mx-store-ship', JSON.stringify( this.delivery ) )

  }

}
