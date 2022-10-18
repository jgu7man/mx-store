import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Addon, MxStoreProductModel, ProdDesc, ProdVariante } from '../product.model';
import { MxStoreProductsService } from '../products.service';
import { Router } from '@angular/router';
import { MxStoreCategoriesService } from '../../categories/categories.service';
import { Location } from '@angular/common';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { DelProdcutComponent } from '../del-prodcut/del-prodcut.component';
import { MxStoreCategoryModel } from '../../categories/category.model';

@Component({
  selector: 'mx-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Input() public product: MxStoreProductModel

  public defaultDesc: ProdDesc = {
    cant: 0,
    exp: `${ new Date().getFullYear() }-${new Date().getMonth()}-${new Date().getDate()}`,
    type: '%'
  }
  public imgToLoad: any;
  public precio = [ '$', /[1-9]/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ]
  public categories?: MxStoreCategoryModel[]
  @Output() closeForm: EventEmitter<any> = new EventEmitter()


  constructor (
    public _products: MxStoreProductsService,
    private _categorias: MxStoreCategoriesService,
    public location: Location,
    private _dialog: MatDialog,
    private router: Router
  ) {
    // this.product = undefined
    this.product = new MxStoreProductModel( '', 0, false, '', {}, '', [], [],[],[], this.defaultDesc )
  }

  async ngOnInit() {
    this.categories = await this._categorias.loadCategories()

    this._products.imageUrl.subscribe( imageUrl => {
      if ( !this.product ) throw { message: 'No existe el producto'}
      this.product.imagenUrl = imageUrl
    } )
    this._products.galleyImageUrl.subscribe( imageUrl => {
      if ( !this.product ) throw { message: 'No existe el producto'}

      this.product.galeria!.push( imageUrl )
    } )


    if ( this.product.descuento ) {
      let exp = this.product.descuento.exp
      let month = exp.getMonth() + 1
      if ( month < 10 ) { month = `0${ month.toString() }` }
      else { month = `${month}` }

      this.defaultDesc = {
        cant: this.product.descuento.cant,
        exp: `${ exp.getFullYear() }-${ month }-${ exp.getDate() }`,
        type: this.product.descuento.type
      }
    }

  }



  setStock( e: MatSlideToggleChange ) {
    this.product.onStock = e.checked
  }

  onLoadImg( file: any ) {
    this.imgToLoad = file.target.files[ 0 ]
    var reader = new FileReader()
    reader.onload = () => {
      var img: any;
      img = document.getElementById( 'imgReferencia' )
      img.src = reader.result
    }
    reader.readAsDataURL( file.target.files[ 0 ] )

    this._products.addProductImage( this.imgToLoad )
  }

  setGallery( images: any ) {
    let files: any[] = images.value
    files.forEach( async image => {
      let currentFile = this.product.galeria!.find( img => img.alt == image.name )
      if ( !currentFile ) {
        this._products.loadGalleryImage( image )
      }
    } );
  }

  getImageURL( imageURL: string ) {
    this.product.imagenUrl = imageURL
  }

  deleteProductImage() {
    this.product.imagenUrl  = {}
  }

  getImageGallery( gallery: any[] ) {
    console.log(gallery);
    this.product.galeria = gallery
  }

  deleteImageGallery(imageURL: string) {
    var itemDeleted = this.product.galeria!.findIndex(
      img => img.url == imageURL
    )
    this.product.galeria!.splice(itemDeleted, 1)
  }

  catchVariantes( variantes: ProdVariante[] ) {
    this.product.variantes = variantes
  }

  catchAddons( addons: Addon[] ) {
    this.product.addons = addons
  }

  catchDesc( desc: ProdDesc ) {
    this.defaultDesc = desc
    this.product.descuento!.exp = new Date(
      desc.exp.split( '-' )[ 0 ],
      desc.exp.split( '-' )[ 1 ] - 1,
      desc.exp.split( '-' )[ 2 ]
    )
  }

  onDelete() {
    var dialog = this._dialog.open( DelProdcutComponent, {
      minWidth: 320,
      data: this.product.id
    } )

    dialog.afterClosed().subscribe(
      () => {
        this.closeForm.emit()
        this.router.navigateByUrl( 'panel', { skipLocationChange: true } )
        .then(() => this.router.navigate(['panel/tienda/products']))
      } )
    .unsubscribe()
  }

  merge( values: Partial<MxStoreProductModel>) {
    this.product = { ...this.product, ...values }
  }

  onSubmit() {
    this._products.updateProduct( this.product ).then( () => {
      this.closeForm.emit()
    } )
  }
}
