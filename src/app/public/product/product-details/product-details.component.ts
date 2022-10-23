import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MxLoading } from '@marxa/devkit';
import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private _product = new BehaviorSubject <MxStoreProductModel | undefined>(undefined)
  @Input() set product( object: MxStoreProductModel | undefined ) { this._product.next( object ) }
  get product() { return this._product.getValue() }

  @Input() categoria?:string
  attrs: any[] = []

  constructor (
    private _loading:MxLoading,
  ) { }

  ngOnInit() {
    this._product.subscribe( async product => {
      if ( product ) {
        this.attrs = []
        await this._loading.waitFor(300)
        var attrs = Object.keys( product )
        attrs.forEach( ( attr, i ) => {
          if ( attr.includes('#') ) {attrs.splice( i, 1 )}
        } )
        var path = `tienda/productos/categorias/${ this.categoria }`

      }
    })
  }



  validateAttr( attr: string ) {
    if ( !this.product ) throw new Error( 'No existe producto' )
    let value = this.product[attr as keyof MxStoreProductModel ]
    if ( typeof value  === 'undefined' || value === 'undefined' || typeof value === null) {
      return false
    }
    return true
  }

  attrType( attr: string ) {
    if ( !this.product ) throw new Error( 'No existe producto' )
    let value = this.product[attr as keyof MxStoreProductModel ]
    if ( Array.isArray( value ) ) {
      return 'array'
    } else if ( typeof value == 'object' ) {
      return 'object'
    } else if ( value == true ) {
      return 'true'
    } else {
      return 'string'
    }
  }

}
