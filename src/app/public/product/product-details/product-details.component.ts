import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MxLoading } from '@marxa/devkit';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private _product = new BehaviorSubject <{}>({})
  @Input() set product( object: {} ) { this._product.next( object ) }
  get product() { return this._product.getValue() }

  @Input() categoria:string
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
    if ( attr == 'undefined' || attr == 'false' ) {
      return false
    } else if (attr) {
      return true
    } else {
      return false
    }
  }

  attrType( attr ) {
    if ( Array.isArray( attr ) ) {
      return 'array'
    } else if ( typeof attr == 'object' ) {
      return 'object'
    } else if ( attr == true ) {
      return 'true'
    } else {
      return 'string'
    }
  }

}
