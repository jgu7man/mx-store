import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MxStoreCategoryModel } from 'src/app/store-panel/categories/category.model';
import { MxStoreCategoriesService } from 'src/app/store-panel/categories/categories.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: [ './categorias.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class CategoriasComponent implements OnInit {

  categorias: MxStoreCategoryModel[] = []
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private _title: Title,
    private _categorias: MxStoreCategoriesService
  ) {
  }

  async ngOnInit() {
    this.categorias = await this._categorias.loadCategories()
  }









}
