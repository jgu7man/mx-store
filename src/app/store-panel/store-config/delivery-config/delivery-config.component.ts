import { Component, OnInit } from '@angular/core';

import { DeliveryService } from './delivery.service';
import { DeliveryConfig } from './delivery-config.model';

@Component({
  selector: 'gdev-delivery-config',
  templateUrl: './delivery-config.component.html',
  styleUrls: ['./delivery-config.component.scss']
})
export class DeliveryConfigComponent implements OnInit {

  deliveryConfig: DeliveryConfig
  shipPosibilities: ShipPosibility[] = [
    { value: 'delivery', viewValue: 'A domicilio' },
    { value: 'pickup', viewValue: 'Recoger en sucursal' },
  ]


  constructor (
    public storeConfig: DeliveryService
  ) {
    this.deliveryConfig = new DeliveryConfig(0, [])
    this.getConfig()
   }

  ngOnInit(): void {
  }

  async getConfig() {
    var config = await this.storeConfig.getDeliveryConfig()
    if ( config ) {
      this.deliveryConfig.costo = config.costo
      this.deliveryConfig.shipPosibilities = config.shipPosibilities
    }
  }

  

}

export interface ShipPosibility {
  value: string,
  viewValue: string
}


