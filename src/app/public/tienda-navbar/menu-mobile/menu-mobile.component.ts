import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ClienteLoginService } from '../../clientes/clientes-login/cliente-login.service';
import { MobileNavbarService } from '../mobile-navbar.service';
import { MxStoreCategoryModel } from 'src/app/store-panel/categories/category.model';
import { MxStoreCategoriesService } from 'src/app/store-panel/categories/categories.service';
declare var $: any;

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent implements OnInit {

  categorias: MxStoreCategoryModel[] = []

  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter()
  constructor(
    public auth: ClienteLoginService,
    public location: Location,
    public _navbar: MobileNavbarService,
    private _categories: MxStoreCategoriesService
  ) {
   }

  async ngOnInit() {
    let path = this.location.path().split('/')
    $("#"+path[2]).attr('aria-expanded', 'true')
    this.categorias = await this._categories.loadCategories()
  }

  onActive(path: string) {
    return this.location.path().includes(path)
  }




}
