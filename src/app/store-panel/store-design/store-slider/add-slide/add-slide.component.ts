import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MxLink, MxSlide, MxSlider } from '@marxa/slider';

export interface imageElement {
  url: string,
  alt?: string
}

@Component({
  templateUrl: './add-slide.component.html',
  styleUrls: ['./add-slide.component.scss']
})
export class AddSlideComponent implements OnInit {

  enlace: MxLink = {url: '', newTab: false}
  slide: MxSlide = {
    nombre: '', imageURL: '', enlace: this.enlace,  activado: true
  }



  constructor (
    public dialog: MatDialogRef<AddSlideComponent>,
    private _slides: MxSlider
  ) {
    // this.uploader = new FileImageInputModel(
    //   'Subir imagen', 'upload-image', true, 'Cargar'
    // )
  }

  ngOnInit(): void {

  }

  onActivadoChange(event: MatSlideToggleChange) {
    this.slide.activado = event.checked
  }

  onNewtabChange( event: MatCheckboxChange ) {
    this.enlace.newTab = event.checked
  }

  catchImageURL(image: any) {
    this.slide.imageURL = image.url
  }

  addSlide() {
    this.slide.enlace = this.enlace
    this._slides.addSlide( this.slide, 'tienda' )
    .then(() => this.dialog.close())
  }

}
