import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GalleryData, ProductGalleryComponent } from '../product-gallery/product-gallery.component';

@Component({
  selector: 'gdev-gallery-scroll-thumbnail',
  templateUrl: './gallery-scroll-thumbnail.component.html',
  styleUrls: ['./gallery-scroll-thumbnail.component.scss']
})
export class GalleryScrollThumbnailComponent implements OnInit {

  @Input() images: any[]
  @Input() imageIndex: number
  @Output() updateImage: EventEmitter<any> = new EventEmitter()
  constructor (
    public dialog_: MatDialog
  ) { }

  ngOnInit() {
  }

  openGallery(index: number) {
    var galleryData: GalleryData = {
      gallery: this.images, index 
    }
    this.dialog_.open( ProductGalleryComponent, {
      maxWidth: '90vw',
      minWidth: '50vw',
      maxHeight: '90vh',
      data: galleryData
    })
  }

  scrollMinLeft() {
    var minis = document.getElementById( 'miniaturas' )
    var scrollAmount = 0
    var slideTimer = setInterval( () => {
      minis.scrollLeft -= 15
      scrollAmount += 15
      if ( scrollAmount >= 150 ) {
        window.clearInterval( slideTimer );
      }
    }, 15 )
  }

  checkScrollLeft() {
    var minis = document.getElementById( 'miniaturas' )
    var scrollLeft = minis.scrollLeft
    var valid = scrollLeft <= 0 ? false : true
    return valid
  }

  scrollMinRight() {
    var minis = document.getElementById( 'miniaturas' )
    var scrollAmount = 0
    var slideTimer = setInterval( () => {
      minis.scrollLeft += 15
      scrollAmount += 15
      if ( scrollAmount >= 150 ) {
        window.clearInterval( slideTimer );
      }
    }, 15 )
  }

  checkScrollRight() {
    var minis = document.getElementById( 'miniaturas' )
    var index = document.getElementById( 'index' )
    var scrollMinis = minis.scrollWidth
    var scrollIndex = index.scrollWidth
    var diff = scrollMinis - scrollIndex
    var scrollLeft = minis.scrollLeft
    var valid = scrollLeft >= diff ? false : true
    return valid
  }

}
