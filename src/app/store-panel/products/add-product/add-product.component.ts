import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Addon, MxStoreProductModel, ProdDesc, ProdVariante } from '../product.model';
import { MxStoreCategoriesService } from '../../categories/categories.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MxStoreProductsService } from '../products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'mx-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public product: MxStoreProductModel
  public imgToLoad: any;
  public precio = [ '$', /[1-9]/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ]
  public categories: any[] = []


  public defaultDesc: ProdDesc = {
    cant: 0,
    exp: `${ new Date().getFullYear() }-${ new Date().getMonth() }-${ new Date().getDate() }`,
    type: '%'
  }

  @Output() closeForm: EventEmitter<any> = new EventEmitter()


  constructor (
    public _products: MxStoreProductsService,
    private _categorias: MxStoreCategoriesService,
    public location: Location
  ) {
    this.product = new MxStoreProductModel( '', 0,  false, '', {}, '', [], [] )
  }

  async ngOnInit() {
    this.categories = await this._categorias.loadCategories()

    this._products.imageUrl.subscribe( imageUrl => {
      this.product.imagenUrl = imageUrl
    } )
    this._products.galleyImageUrl.subscribe( imageUrl => {
      this.product.galeria!.push(imageUrl)
    } )


    if ( this.product.descuento ) {
      let exp = this.product.descuento.exp
      let month = exp.getMonth() + 1
      if ( month < 10 ) { month = `0${ month.toString() }` }
      else { month = `${ month }` }

      this.defaultDesc = {
        cant: this.product.descuento.cant,
        exp: `${ exp.getFullYear() }-${ month }-${ exp.getDate() }`,
        type: this.product.descuento.type
      }
    }
  }

  getImageURL(imageURL: string) {
    this.product.imagenUrl = imageURL
  }



  setStock( e: MatSlideToggleChange ) {
    this.product.onStock = e.checked
  }

  onLoadImg( file: any, ) {
    this.imgToLoad = file.target.files[ 0 ]
    var reader = new FileReader()
    reader.onload = () => {
      var img: any;
      img = document.getElementById( 'imgReferencia' )
      img.src = reader.result
    }
    reader.readAsDataURL( file.target.files[ 0 ] )

    this._products.addProductImage(this.imgToLoad)
  }



  deleteProductImage( image: string ) {
    this.product.imagenUrl = {}
  }

  getImageGallery( gallery: any[] ) {
    console.log( gallery );
    this.product.galeria = gallery
  }

  deleteImageGallery( imageURL: string ) {
    var itemDeleted = this.product.galeria!.findIndex(
      img => img.url == imageURL
    )
    this.product.galeria!.splice( itemDeleted, 1 )
  }

  catchVariantes(variantes: ProdVariante[]) {
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



  merge( values: Partial<MxStoreProductModel> ) {
    this.product = { ...this.product, ...values }
  }

  onSubmit( ) {
    this._products.addProduct( this.product ).then( () => {
      this.closeForm.emit()
    })
  }
}
