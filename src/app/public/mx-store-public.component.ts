import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MxAlert } from '@marxa/devkit';
import { Router } from '@angular/router';
import { MainPanelService } from '../panel/main-panel.service';
import { MobileNavbarService } from 'src/app/public/tienda-navbar/mobile-navbar.service';
import { IntegrationsService } from '../store-panel/store-config/integrations-config/integrations.service';
import { StoreModel } from '../panel/models/store.model';
import {
  MxAlertModel,
  SweetAlert,
} from '@marxa/devkit';

@Component({
  selector: 'mx-store-public',
  templateUrl: './mx-store-public.component.html',
  styleUrls: ['./mx-store-public.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MxStorePublicComponent implements OnInit, AfterViewInit {
  @ViewChild('menu_mobile') menuMobile!: MatDrawer;
  constructor(
    public _navbar: MobileNavbarService,
    private _main: MainPanelService,
    private _alert: MxAlert,
    private _router: Router,
    private _integrations: IntegrationsService
  ) {
    var favicon: HTMLLinkElement | null = document.querySelector(
      '[type="image/x-icon"]'
    );
    // favicon.href = 'app/gdev-panel/assets/img/gdev-icono-trans-1x1.png'

    this._main
      .getStoreData()
      .then((data: StoreModel) => {
        // console.log(data)
        if (data.logoURL) {
          // set logoURL
        }
      })
      .catch(async (error: any) => {
        let alertBody: MxAlertModel = new MxAlertModel(
          {
            message:
              'Errores adminsitrativos. Si eres administrador inicia sesión para resolverlos. Si no, disculpa las molestias',
            confirmButtonText: 'Ir al panel',
            cancelButtonText: 'OK',
          } as SweetAlert,
          'request'
        );

        let response = await this._alert.message(alertBody);
        if (response) {
          this._router.navigate(['/panel']);
        }
      });
  }

  ngOnInit() {
    this.toggleMenu();
  }

  ngAfterViewInit() {
    this._integrations.setScripts();
  }

  toggleMenu() {
    this._navbar.toggleMenu.subscribe((toggle: boolean) => {
      console.log({ menu: toggle });
      toggle ? this.menuMobile.open() : this.menuMobile.close();
    });
  }
}
