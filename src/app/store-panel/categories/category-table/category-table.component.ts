import { Component, OnInit, Input} from '@angular/core';
import { MxStoreCategoryModel } from '../category.model';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { DelCategoryComponent } from '../del-category/del-category.component';

@Component({
  selector: 'mx-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit {

  @Input() categories: any[] = []
  categorySelected: MxStoreCategoryModel
  displayedColumns: string[] = [ 'image', 'name', 'options' ];


  constructor (
    private _dialog: MatDialog
    ) {
    this.categorySelected = new MxStoreCategoryModel('',[])
  }

  ngOnInit() {

  }

  ngOnChanges() {

  }

  onEdit(id: String) {
    this._dialog.open( EditCategoryComponent, {
      maxWidth: '90vw',
      minWidth: '450px',
      data: id
    } )
  }

  onDel(id: String) {
    this._dialog.open( DelCategoryComponent, {
      maxWidth: '90vw',
      minWidth: '450px',
      data: id
    } )
  }



}
