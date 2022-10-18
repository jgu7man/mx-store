import { MxStoreCategoriesService } from './../categories/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';
import { MxIndex } from '@marxa/index';
import { MatSelectionListChange, MatSelectionList } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'mx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: MxStoreProductModel [] = []
  prodSelected?: MxStoreProductModel
  categories: string[] = []

  @ViewChild( 'currentProduct' ) productPanel?: MatDrawer
  @ViewChild( 'listPanel' ) listPanel?: MatSelectionList




  constructor (
    private _categories: MxStoreCategoriesService,
    public index: MxIndex
  ) {

  }

  ngOnInit() {
    this.loadProducts()
    this.loadCategories()

  }



  async reloadProducts() {
    this.products = []
    console.log(this.products);
    this.loadProducts()
  }

  async loadCategories() {
    var categories = await this._categories.loadCategories()
    if ( categories ) {
      categories.forEach( category => {
        this.categories.push(category.name)
      })
    }
  }



  async loadProducts() {
    this.index.initIndex( 'tienda/productos/referencias', 'referencia', 20 )
    this.index.page$.subscribe( data => {
      console.log( data )
      this.products = data
    } )
    this.index.loadingQuery.subscribe( resp => {
      if ( resp ) {
        this.products = []
      }
    } )
    return
  }

  onProdSelected( selected: MatSelectionListChange ) {

    if ( this.productPanel!.opened ) { this.productPanel!.close() }
    this.prodSelected = selected.option.value
    this.productPanel!.open()
  }

  onClosePanel() {
    this.productPanel!.close()
    this.listPanel!.deselectAll()
    this.prodSelected = undefined
  }



}
