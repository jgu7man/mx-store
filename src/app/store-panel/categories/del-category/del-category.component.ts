import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MxStoreCategoriesService } from '../categories.service';
import { MxStoreCategoryModel } from '../category.model';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';

@Component({
  selector: 'mx-del-category',
  templateUrl: './del-category.component.html',
  styleUrls: ['./del-category.component.scss']
})
export class DelCategoryComponent implements OnInit {

  category: MxStoreCategoryModel
  constructor (
    private _dialog: MatDialogRef<DelCategoryComponent>,
    @Inject( MAT_DIALOG_DATA ) private id: string,
    private _categorias: MxStoreCategoriesService,
    private _router: Router,
    private _alerta: MxAlert
  ) {
    this.category = new MxStoreCategoryModel( '', [], 'tienda/productos/categorias' )
   }

  ngOnInit() {
    this.category.name = this.id
    console.log(this.category);
  }

  onDelete() {
    this._categorias.delCategory( this.category )
      .then( () => {
        console.log( 'listo' );
        this._dialog.close()
        this._router.navigateByUrl( 'panel/store', { skipLocationChange: true } ).then( () => {
          this._router.navigate( [ 'panel/store/categories' ] )
        } )
      } )
      .catch( error => { this._alerta.message( 'Oops! Algo salió mal' ) } )
  }

}
