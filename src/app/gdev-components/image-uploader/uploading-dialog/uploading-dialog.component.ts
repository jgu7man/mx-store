import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { imageElement } from '../image-preview/image-preview.component';

@Component({
  templateUrl: './uploading-dialog.component.html',
  styleUrls: ['./uploading-dialog.component.scss']
})
export class UploadingComponent implements OnInit {

  srcGroup: any[] = []

  constructor (
    private _dialog: MatDialogRef<UploadingComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: UploadingData
  ) { }

  ngOnInit(): void {
  }

  setResult(result: imageElement) {
    this.srcGroup.push( result )
  }

  onClose() {
    if ( this.srcGroup.length == this.data.objects )
      this._dialog.close(this.srcGroup)
  }

}

export interface UploadingData {
  files: imageElement[]
  folder: string,
  objects: number
}
