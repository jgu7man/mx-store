import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCrudModule } from './list-crud/list-crud.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListCrudModule,
  ],
  exports: [
    ListCrudModule
  ]
})
export class GdevComponentsModule { }
