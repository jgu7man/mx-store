import { Component, OnInit, Inject } from '@angular/core';
import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MxStoreProductsService } from '../products.service';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';

@Component({
  templateUrl: './del-prodcut.component.html',
  styleUrls: ['./del-prodcut.component.scss']
})
export class DelProdcutComponent implements OnInit {

  product: MxStoreProductModel
  constructor (
    private _dialog: MatDialogRef<DelProdcutComponent>,
    @Inject( MAT_DIALOG_DATA ) private productId: string,
    private _products: MxStoreProductsService,
    private _router: Router,
    private _alerta: MxAlert
  ) {
    this.product = new MxStoreProductModel ( '',  0, true, '', {},'',[],[] )
  }

  ngOnInit() {
  }

  onDelete() {
    this._products.delProduct( this.productId )
      .then( () => {
        console.log( 'listo' );
        this._dialog.close()
      } )
      .catch( error => {
        this._dialog.close()
        this._alerta.message( 'Oops! Algo salió mal: '+error )
      } )
  }

}
