import { Component, OnInit } from '@angular/core';
import { iUploadedFile } from '@marxa/storage-v9';
import { filter } from 'rxjs/operators';
import { MainPanelService } from '../../main-panel.service';
import { iBrand } from './brand.model';

@Component({
  selector: 'app-brand-content',
  templateUrl: './brand-content.component.html',
  styleUrls: ['./brand-content.component.scss']
})
export class BrandContentComponent implements OnInit {

  brandInfo: iBrand
  constructor(
    private _main: MainPanelService
  ) {
    this._main.getBrandInfo()
      .subscribe(info => {
        if (info) this.brandInfo = info
    })
   }

  ngOnInit(): void {
  }

  onHeadLogoUploaded(files: iUploadedFile) {
    console.log( files )
    this._main.addBrandInfo({'headLogo': files[0]})
  }
  onSquareLogoUploaded(files: iUploadedFile) {
    console.log( files )
    this._main.addBrandInfo({'squareLogo': files[0]})
  }
  onIconLogoUploaded(files: iUploadedFile) {
    this._main.addBrandInfo({'iconLogo': files[0]})
  }
  onNegativeLogoUploaded(files: iUploadedFile) {
    this._main.addBrandInfo({'negLogo': files[0]})
  }

  onFileUploaded(files: iUploadedFile, field: keyof iBrand): void{
    console.log( field, files )
    this._main.addBrandInfo({[field]: files[0]})
  }

}
