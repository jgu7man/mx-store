import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MainPanelService } from 'src/app/panel/main-panel.service';
import { MxAlert, MxSEO } from '@marxa/devkit';
import { DatosContactoModel } from 'src/app/panel/contacto/contacto.model';

@Component({
  selector: 'gdev-aparador',
  templateUrl: './aparador.component.html',
  styleUrls: [ './aparador.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class AparadorComponent implements OnInit {

  store?: DatosContactoModel
  constructor (
    private _seo: MxSEO,
    private _main: MainPanelService,
    private _alert: MxAlert,
    private _router: Router
  ) { }

  async ngOnInit() {
    this.store = await this._main.getContactDatos()
    if ( this.store ) {
      this._seo.setTags( {
        title: this.store.store_name,
        description: 'Demo de E-commerce | Un producto de Marxa Digital',
        image: 'https://gdev-store.web.app/assets/icons/ms-icon-310x310.png'
      })
    }
  }

}
