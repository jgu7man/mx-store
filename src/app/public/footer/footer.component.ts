import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";
import { DatosContactoModel } from 'src/app/panel/contacto/contacto.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { MainPanelService } from 'src/app/panel/main-panel.service';

@Component({
  selector: 'mx-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  getIn: boolean = false
  storeDatos!: DatosContactoModel
  logo?: string

  constructor (
    private fs: AngularFirestore,
    private _main: MainPanelService
  ) {
    this.getStoreData()
    this._main.getBrandInfo().subscribe(info => {
      if (info) this.logo = info.squareLogo?.url
    })
   }

  ngOnInit(): void {
    timer( 2000 ).subscribe( ready => {
      this.getIn = true
    })
  }

  async getStoreData() {
    this.storeDatos = await (await this.fs.collection('_admin').ref.doc('datos_contacto').get()).data() as DatosContactoModel

  }

}
