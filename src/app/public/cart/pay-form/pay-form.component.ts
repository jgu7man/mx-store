import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClienteModel } from '../../../panel/clientes/cliente.model';
import { DeliveryAddress, ProductOrdered, OrderModel, Buyer, OrderTotales } from '../order.model';
import { OrdersService } from '../orders.service';
import { MxAlert } from '@marxa/devkit';
import { Router } from '@angular/router';
import { DeliveryConfig } from 'src/app/store-panel/store-config/delivery-config/delivery-config.model';
import { DeliveryService } from 'src/app/store-panel/store-config/delivery-config/delivery.service';
import { MxAlertModel } from '@marxa/devkit';

@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.scss']
})
export class PayFormComponent implements OnInit {

  payForm = new FormControl( '', [ Validators.required ] );
  cliente?: ClienteModel
  buyer: Buyer
  delivery: DeliveryAddress
  order: OrderModel
  totales: OrderTotales
  @Input() total_pagar: number = 0
  deliveryConfig?: DeliveryConfig

  deliveryInvalidForm: boolean = true
  pickupValidForm: boolean = false

  constructor (
    private _deliveryS: DeliveryService,
    private _orders: OrdersService,
    private _alert: MxAlert,
    private router: Router
  ) {

    this.order = JSON.parse( localStorage.getItem( 'mx-store-order' )! )
    this.delivery = {
      address: '',
      depto: '',
      city: '',
      state: '',
      country: 'México',
    }
    this.buyer = { name: '', email: '', celular: '',id:'' }
    this.totales = { grand_total: 0, tax: 0, subtotal: 0, }
    this.order = new OrderModel([], this.totales,'',false)
    let areCart = JSON.parse( localStorage.getItem( 'mx-store-order' )! );
    if(!areCart) this.router.navigate(['/'])
   }

  async ngOnInit() {
    this.setBuyer()
    this.setCostos()
  }

  async setBuyer() {
    this.cliente = JSON.parse( localStorage.getItem( 'mx-store-cliente' )! )
    if ( this.cliente ) {
      this.buyer.name = this.cliente.nombre ? this.cliente.nombre : '';
      this.buyer.celular = this.cliente.celular ? this.cliente.celular : '';
      this.buyer.email = this.cliente.email ? this.cliente.email : '';
      this.buyer.id = this.cliente.idCliente ? this.cliente.idCliente : '';
    }
  }

  async setCostos() {
    this.deliveryConfig = await this._deliveryS.getDeliveryConfig()
    this.order.totales.tax = this.deliveryConfig.costo
    this.order.totales.grand_total = (this.deliveryConfig.costo || 0) + (this.order.totales.subtotal || 0)
  }



  async setDelivery( changes: any ) {
    this.delivery = changes.delivery
    this.deliveryInvalidForm = changes.invalid
  }

  async setPickup( changes: any ) {
    console.log(changes);
    this.order.pickup = changes.pickup
    this.pickupValidForm = changes.valid
  }

  getErrorMessage() {
    if ( this.payForm.hasError( 'required' ) ) {
      return 'Este campo es requerido';
    }
    return
  }

  validatePay(){
    if ( !this.order.pay_method ) {
      return false
    } else if ( this.pickupValidForm || !this.deliveryInvalidForm ) {
      return true
    } else {
      return false
    }
  }

  catchMethodPay(method: any) {
    console.log(method);
    this.order.pay_method = method
    console.log(this.order);
  }

  onSubmit() {
    this.order.buyer = this.buyer
    this.order.delivery = this.delivery
    this.order.ship_method = 'delivery'
    localStorage.setItem( 'mx-store-ship', JSON.stringify( this.delivery ) )

    var alertBody: MxAlertModel = new MxAlertModel(
      {
        message: 'Transacción completada',
        confirmButtonText: 'Ir a tienda',
        cancelButtonText: 'Ir a Cuenta'
      }, 'request')

    this._orders.saveOrder( this.order )
      .then( async () => {
        let resp = await (await this._alert.message( alertBody as MxAlertModel )).isConfirmed

        resp
          ? this.router.navigate( [ '/tienda' ] )
          : this.router.navigate( [ '/tienda/cuenta' ] );

      } )
  }

}
