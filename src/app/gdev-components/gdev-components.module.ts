import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCrudModule } from './list-crud/list-crud.module';
import { UploadingComponent } from './image-uploader/uploading-dialog/uploading-dialog.component';
import { ImagePreviewComponent } from './image-uploader/image-preview/image-preview.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    ImagePreviewComponent,
    UploadingComponent
  ],
  imports: [
    CommonModule,
    ListCrudModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ListCrudModule,
    ImageUploaderComponent
  ]
})
export class GdevComponentsModule { }
