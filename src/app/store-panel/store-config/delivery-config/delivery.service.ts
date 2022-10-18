import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MxAlert } from '@marxa/devkit';
import { DeliveryConfig } from './delivery-config.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor (
    private fs: AngularFirestore,
    private alert: MxAlert
  ) { }

  async getDeliveryConfig() {
    let config = await this.fs.collection( 'tienda' ).ref.doc( 'delivery' ).get()
    return config.data() as DeliveryConfig
  }

  saveDeliveryConfig(config: DeliveryConfig) {
    this.fs.collection( 'tienda' ).ref.doc( 'delivery' )
      .set( {...config}, { merge: true } )
      .then( () =>
        this.alert.notify( 'Configuración guardada' )
      )
  }
}
