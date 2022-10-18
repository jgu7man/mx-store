import { Component, OnInit, Input, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { imageElement } from 'src/app/gdev-tools/advance-fields/components/image-uploader/image-preview/image-preview.component';
import { MatCarouselComponent } from '../../../../gdev-tools/gdev-slider/mat-carousel/carousel.component';

@Component( {
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: [ './product-gallery.component.scss' ]
} )
export class ProductGalleryComponent implements AfterViewInit {

  @ViewChild('productSlider') productSlider: MatCarouselComponent

  constructor (
    public dialog_: MatDialogRef<ProductGalleryComponent>,
    @Inject( MAT_DIALOG_DATA) public dataGallery: GalleryData
  ) { }


  ngAfterViewInit() {
    console.log( this.dataGallery.index );
    this.productSlider.slideTo(this.dataGallery.index)
  }

}


export interface GalleryData {
  gallery: imageElement[],
  index: number
}