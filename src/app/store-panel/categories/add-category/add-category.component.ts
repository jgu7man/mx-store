import { Component, OnInit, Input } from '@angular/core';
import { MxStoreCategoryModel } from '../category.model';
import { MxStoreCategoriesService } from '../categories.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MxAlert } from '@marxa/devkit';
import { Router } from '@angular/router';

@Component({
  selector: 'mx-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Input() path: string | null = null
  public category: MxStoreCategoryModel
  constructor (
    private _category: MxStoreCategoriesService,
    private _dialog: MatDialogRef<AddCategoryComponent>,
    private _alerta: MxAlert,
    private _router: Router
  ) {
    this.category = new MxStoreCategoryModel('',[], 'tienda/productos/categorias')
   }

  ngOnInit() {
  }

  onSubmit() {
    this._category.addCategory( this.category )
      .then( () => {
        this._dialog.close()
      } )
      .catch( error => { this._alerta.message( 'Oops! Algo salió mal' ) } )
  }

}
