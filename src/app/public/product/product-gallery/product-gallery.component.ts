import { Component, OnInit, Input, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { imageElement } from 'src/app/store-panel/store-design/store-slider/add-slide/add-slide.component';
import { MxSlide } from '@marxa/slider';

@Component( {
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: [ './product-gallery.component.scss' ]
} )
export class ProductGalleryComponent implements AfterViewInit {

  gallery: MxSlide[] = []

  constructor (
    public dialog_: MatDialogRef<ProductGalleryComponent>,
    @Inject( MAT_DIALOG_DATA) public dataGallery: GalleryData
  ) {
    this.gallery = dataGallery.gallery.map( i => ( {
      imageURL: i.url,
      activado: true,
      nombre: i.alt || '',
    }))
  }


  ngAfterViewInit() {
    console.log( this.dataGallery.index );
  }

}


export interface GalleryData {
  gallery: imageElement[],
  index: number
}
