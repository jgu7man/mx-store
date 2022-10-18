import { Component, OnInit } from '@angular/core';
import { MxStoreCategoriesService } from 'src/app/store-panel/categories/categories.service';
import { MxStoreCategoryModel } from 'src/app/store-panel/categories/category.model';

@Component({
  selector: 'app-menu-categorias',
  templateUrl: './menu-categorias.component.html',
  styleUrls: ['./menu-categorias.component.css']
})
export class MenuCategoriasComponent implements OnInit {

  categorias: MxStoreCategoryModel[] = []
  constructor (
    private _categories: MxStoreCategoriesService
  ) { }

  async ngOnInit() {
    this.categorias = await this._categories.loadCategories()
  }

}
