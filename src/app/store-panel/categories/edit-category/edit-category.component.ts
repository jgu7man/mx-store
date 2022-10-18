import { Component, OnInit, Input, Inject } from '@angular/core';
import { MxStoreCategoryModel } from '../category.model';
import { MxStoreCategoriesService } from '../categories.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';

@Component({
  selector: 'mx-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() path: string | null = null
  public category: MxStoreCategoryModel
  constructor (
    private _category: MxStoreCategoriesService,
    private _dialog: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) private categoryId: string,
    private _alerta: MxAlert,
    private _router: Router
  ) {
    this.category = new MxStoreCategoryModel( '', [], 'tienda/productos/categorias' )
  }

  ngOnInit() {
    this.category.name = this.categoryId
    console.log(this.category);
  }

  onSubmit() {
    this._category.editCategory( this.category, this.categoryId )
      .then( () => {
        console.log( 'listo' );
        this._dialog.close()
        this._router.navigateByUrl( 'panel' ).then( () => {
          this._router.navigate( [ 'panel/tienda/categories' ] )
        } )
      } )
      .catch( error => { this._alerta.message( 'Oops! Algo salió mal' ) } )
  }

}
