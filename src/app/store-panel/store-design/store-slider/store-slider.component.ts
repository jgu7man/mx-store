import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { AddSlideComponent } from './add-slide/add-slide.component';
import { MatDrawer } from '@angular/material/sidenav';
import { MxLink, MxSlide, MxSlider } from '@marxa/slider';

@Component({
  templateUrl: './store-slider.component.html',
  styleUrls: ['./store-slider.component.scss']
})
export class StoreSliderComponent implements OnInit {

  // slides: Slide[]
  tempEnlace: MxLink = {url: '', newTab: true}
  slideSelected: MxSlide = {nombre: '', imageURL: '', activado: true, enlace: this.tempEnlace}
  @ViewChild( 'currentSlide' ) slidePanel!: MatDrawer
  @ViewChild( 'listPanel' ) listPanel!: MatSelectionList

  constructor (
    public dialog: MatDialog,
    public slidesS: MxSlider
  ) {
    this.slidesS.getSlidesList('tienda')
   }

  ngOnInit(): void {

  }

  // async getSlides() {
  //   this.slides = await this.slidesS.loadSlides()
  //   console.log( this.slides );
  // }

  openAddDialog() {
    var dialogRef =
    this.dialog.open( AddSlideComponent, {
      minWidth: '80%'
    } )
    // dialogRef.afterClosed().subscribe( () =>
    // {this.getSlides()})
  }

  onSlideSelected( selected: MatSelectionListChange ) {
    if ( this.slidePanel.opened ) { this.slidePanel.close() }
    this.slideSelected = selected.option.value
    this.slidePanel.open()
  }

  onCloseSlide() {
    this.slidePanel.close()
    this.listPanel.deselectAll()
    this.slideSelected = { nombre: '', imageURL: '', activado: true, enlace: this.tempEnlace }
  }

  onDeleteSlide() {

  }

}
