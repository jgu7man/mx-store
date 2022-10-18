import { Component, OnInit } from '@angular/core';
import { MxStoreCategoryModel } from './category.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MxStoreCategoriesService } from './categories.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';

import { MxLoading } from '@marxa/devkit';

@Component({
  selector: 'mx-store-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public forms: boolean = false
  public add: boolean = false
  public edit: boolean = false
  public del: boolean = false
  public attr: boolean = false
  public categories?: MxStoreCategoryModel[]
  public idSelect: string | null = null
  constructor (
    private _categories: MxStoreCategoriesService,
    private _loading: MxLoading,
    private _title: Title,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this._title.setTitle( 'Panel - Tienda - Categorias' )
  }

  async ngOnInit() {
    this._loading.toggleWaiting(true)
    this.categories = await this._categories.loadCategories()
    this._loading.toggleWaiting( false )
  }


  async ngOnChanges() {
    this.categories = await this._categories.loadCategories()
  }


  onSelect( id: string ) {
    this.idSelect = id
  }

  onAdd() {
    var dialog = this._dialog.open( AddCategoryComponent, {
      maxWidth: '90vw',
      minWidth: '450px'
    } )

    dialog.afterClosed().subscribe( () => {
      this.router.navigateByUrl( 'panel', { skipLocationChange: true } )
      .then(()=> this.router.navigate(['panel/tienda/categories']))
    })
  }



}
