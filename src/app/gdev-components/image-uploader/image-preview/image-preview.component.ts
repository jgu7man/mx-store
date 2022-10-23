import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'gdev-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit, OnDestroy {

  @Input() srcPreview?: imageElement = {} as imageElement
  @Input() folder: string = ''
  @Input() prefix: string = ''

  private _image : BehaviorSubject<any> = new BehaviorSubject({});
  @Input() set image(img: any) { this._image.next(img); }
  get image() { return this._image.getValue() }
  private imageSubs: Subscription = {} as Subscription

  public imageLoadPercent: number = 0

  @Output() imageURL: EventEmitter<imageElement> = new EventEmitter()
  @Output() onDeleted: EventEmitter<string> = new EventEmitter()

  constructor (
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.imageSubs = this._image.pipe(
      distinctUntilChanged(),
    ).subscribe(image => {
      if ( image ) {
        if ( image instanceof File ) {
          this.image = image
          this.setImgPreview()
        }
      }
    })
  }

  validateSrcPreview(src?: string | imageElement) {
    if (src === undefined || typeof src !== 'object' && Object.keys(src).length == 0 || src == '') {
      return false
    } else {
      return true
    }
  }


  setImgPreview() {
    var reader = new FileReader()
    reader.onload = () => {
      var img: any = document.getElementById( this.image.name )
      img.src = reader.result
    }
    reader.readAsDataURL( this.image )
    this.uploadStorage()
  }

  async uploadStorage() {
    const
      name = !this.prefix
        ? `${new Date().getTime() }-${ this.image.name }`
        : `${this.prefix}-${this.image.name}`,
      path = `${ this.folder }/${ name }`,
      ref = this.storage.ref( path ),
      task = this.storage.upload( path, this.image );

    task.percentageChanges().subscribe(percent => {
      if (typeof percent === 'number') this.imageLoadPercent = percent
    } )

    task.snapshotChanges().pipe(
      finalize( async () => {
        await ref.getDownloadURL()
          .subscribe( res => {
            this.srcPreview = {url: res, alt: this.image.name}
            this.imageURL.emit( this.srcPreview )
            var img: any = document.getElementById( this.image.name )
            img.src = ''
          } )
        return
      } )
    ).subscribe()
  }

  deleteFile() {
    if (!this.srcPreview) throw new Error( 'No existe imagen para borrar')
    this.storage.storage.refFromURL( this.srcPreview.url ).delete()
    this.onDeleted.emit(this.srcPreview.url)
    this.srcPreview.url = ''
  }

  ngOnDestroy() {
    this.imageSubs.unsubscribe()
  }

}

export interface imageElement {
  url: string,
  alt?: string
}
