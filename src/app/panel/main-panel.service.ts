import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatosContactoModel } from './contacto/contacto.model';
import { MatDialog } from '@angular/material/dialog';//material
import { CalladminBoxComponent } from './admin/calladmin-box/calladmin-box.component';
import { Router } from '@angular/router';
import { StoreModel } from './models/store.model';
import { iBrand } from './inicio/brand-content/brand.model';
import { Observable } from 'rxjs';
import { MxAlert } from '@marxa/devkit';

@Injectable({
  providedIn: 'root'
})
export class MainPanelService {

  constructor (
    private fs: AngularFirestore,
    private _alert: MxAlert,
    private _router: Router
  ) {

   }

  addSiteInfo() {

  }

  async addContactDatos( datos: DatosContactoModel ) {

    await this.fs.collection( '_admin' ).ref.doc( 'datos_contacto' )
      .set( { ...datos }, { merge: true } )

    this._alert.notify('Datos guardados')
  }

  async getContactDatos() {
    var doc = await this.fs.collection( '_admin' ).ref.doc( 'datos_contacto' ).get()
    if ( doc.exists ) {
      return doc.data() as DatosContactoModel
    } else {
      throw {message:'No data geted' }
    }
  }

  async getStoreData() {
    var doc = await this.fs.collection( '_admin' ).ref.doc( 'datos_contacto' ).get()
    if ( doc.exists ) {
      return doc.data() as StoreModel
    } else {
      throw {message:'No data geted' }
    }
  }

  async addBrandInfo(brandInfo: iBrand) {
    console.log( brandInfo )
    this.fs.collection('_admin').doc('brand_info')
      .set(brandInfo, { merge: true })
      .then(() => {this._alert.notify('Información actualizada')})
  }

  getBrandInfo(): Observable<iBrand | undefined> {
    return this.fs.collection( '_admin' )
      .doc<iBrand>( 'brand_info' )
      .valueChanges()
  }
}
