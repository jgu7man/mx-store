import { Component, Inject, OnInit } from '@angular/core';
import { SidenavNode } from './models/sidenav.interface';
import { Router } from '@angular/router';
import { distinctUntilChanged, distinct, distinctUntilKeyChanged } from 'rxjs/operators';
import { MainPanelService } from './main-panel.service';
import { AdminsService } from './admin/admins.service';
import { MxAlert, MxColor, MxResponsive } from '@marxa/devkit';


@Component({
  selector: 'mx-storage-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor (
    public responsive:MxResponsive,
    private _color: MxColor,
    private _alert: MxAlert,
    private _main: MainPanelService,
    private _router: Router,
    private _auth: AdminsService,
  ) {

    this._auth.admin$.pipe( distinctUntilChanged(
      ( x, y ) =>  x  && x.uid === y.uid
    ))
      .subscribe( auth => {
        if ( auth ) {
          this._main.getContactDatos()
            .catch( () => {
              // this._router.navigate( [ '/panel/inicio/identidad' ] )
              this._alert.message('Es necesario llenar los datos identidad del sitio para comenzar')
            } )
        }
      })

    // if ( this._alert.messageAlert$ ) {
    //   if ( this._color.ColorPalette ) {
    //     this._color.ColorPalette = {
    //       'bg1': '#F0F9FC',
    //       'bg2': '#A7BCC4',
    //       'bg3': '#F9E8E1',
    //       "primary": '#29B7FE',
    //       "accent": '#FC712B',
    //       'dark': '#001419',
    //       'complement1': '#0384C5',
    //     }
    //   }

    //   let favicon: HTMLLinkElement | null = document.querySelector( '[type="image/x-icon"]' )
    //   if (!favicon) throw new Error('No existe favicon')
    //   favicon.href = 'app/gdev-panel/assets/img/gdev-icono-trans-1x1.png'

    // } else {
    //   console.error('Must add gdev-tools or gdev-alerts in the angular project')
    // }
   }

  ngOnInit() { }

  sidenavStructure: SidenavNode[] = [
    {
      name: 'Inicio',
      routeId: [ 'identidad' ],
      route: 'inicio',
      childs: [
        {
          name: 'Identidad del sitio',
          route: 'inicio/identidad',
        },
      ]
    },
    // {
    //   name: 'Diseño',
    //   routeId: [ 'hero' ],
    //   childs: [

    //   ]
    // },
    {
      name: 'Tienda',
      routeId: ['config', 'categories', 'productos', 'pedidos', 'slider'],
      childs: [
        {
          name: 'Configuración',
          route: '/panel/tienda/config',
          routeId: 'config'
        },
        {
          name: 'Categorías',
          route: '/panel/tienda/categories',
        },
        {
          name: 'Productos',
          route: '/panel/tienda/products',
        },
        {
          name: 'Pedidos',
          route: '/panel/tienda/pedidos'
        },
        {
          name: 'Slider',
          route: '/panel/tienda/slider'
        },
      ]
    },
    {
      name: 'Clientes',
      routeId: 'clientes',
      route: 'clientes',
      childs: [
      ]
    },
    {
      name: 'Mails',
      route: 'mails',
      routeId: 'mails'
    },
    {
      name: 'Admin',
      routeId: 'admins',
      route: 'admins'
    },
  ]
}
