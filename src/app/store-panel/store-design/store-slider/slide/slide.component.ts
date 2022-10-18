import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MxLink, MxSlide, MxSlider } from '@marxa/slider';

@Component({
  selector: 'gdev-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  @Input() slide: MxSlide = { nombre: '', imageURL: '', activado: true }
  enlace: MxLink = {url: '', newTab:false}
  @Output() close: EventEmitter<boolean> = new EventEmitter()

  constructor (
    private _slides: MxSlider
  ) { }

  ngOnInit(): void {
    if(this.slide.enlace) this.enlace = this.slide.enlace
  }

  onActivadoChange( event: MatSlideToggleChange ) {
    this.slide.activado = event.checked
  }

  onNewtabChange( event: MatCheckboxChange ) {
    this.enlace.newTab  = event.checked
  }

  onUpdate() {
    this.slide.enlace = this.enlace
    this._slides.updateSlide( this.slide )
  }

  onDelete() {
    this._slides.deleteSlide( this.slide )
    this.close.emit()
  }

}
