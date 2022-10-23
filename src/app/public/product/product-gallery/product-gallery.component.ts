import { Component, OnInit, Input, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MxSlide } from '@marxa/slider';
import { ImageRef } from 'src/app/store-panel/products/product.model';

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
  gallery: ImageRef[],
  index: number
}
