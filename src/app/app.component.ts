import { Component } from '@angular/core';
import { MxAlert, MxColor, MxColorPalette } from '@marxa/devkit';

@Component({
  selector: 'mx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mx-store [demo]';
  appColors: MxColorPalette = {
    main: '#29B7FE',
    accent: '#FC712B',
    dark1: '#001419',
    ligth1: '#ffffff',
    ligth2: '#F0F9FC',
    ligth3: '#F9E8E1',
    accentligth1: '#0384C5',
    accentdark1: '#333333'
  }
  constructor (
    private _colors: MxColor,
    private _alert: MxAlert
  ) {
    this._colors.ColorPalette = this.appColors
    this._alert.storeError = true
  }
}
