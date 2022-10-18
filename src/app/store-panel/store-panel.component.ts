import { Component, OnInit } from '@angular/core';
import { MxResponsive } from '@marxa/devkit';
import { SidenavNode } from '../panel/models/sidenav.interface';

@Component({
  selector: 'mx-store-panel',
  templateUrl: './store-panel.component.html',
  styleUrls: ['./store-panel.component.scss']
})
export class StorePanelComponent implements OnInit {

  constructor (
    public responsive: MxResponsive
  ) { }

  ngOnInit() {
  }

  sidenavStructure: SidenavNode[] = [
    {
      name: 'Incio',
      route: 'inicio',
      routeId: 'inicio',
      childs: [
        {
          name: 'Contacto',
          route: 'contacto',
          routeId: 'contacto'
        },
        {
          name: 'Configuración',
          route: 'config',
          routeId: 'config'
        },
      ]
    },
    {
      name: 'Diseño',
      routeId: ['slider'],
      childs: [
        {
          name: 'Slider',
          route: 'slider'
        }
      ]
    },
    {
      name: 'Categorías',
      route: 'categories',
      routeId: 'categories',
      childs: [

      ]
    },
    {
      name: 'Productos',
      route: 'products',
      routeId: 'products',
      childs: [

      ]
    },
    {
      name: 'Pedidos',
      routeId: [ 'pendientes', 'enviados', 'entregados', 'cancelados' ],
      route: 'pedidos'

    },
    {
      name: 'Clientes',
      routeId: 'clientes',
      route: 'clientes',
      childs: [
        {
          name: 'Mensajes',
          route: 'mensajes',
          routeId: 'mensajes'
        }
      ]
    },
    {
      name: 'Admins',
      routeId: 'admins',
      route: 'admins'
    },
  ]



}
