import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageRef, MxStoreProductModel } from './product.model';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';
import { finalize } from 'rxjs/operators';
import { Location } from '@angular/common';
import { MxAlert } from '@marxa/devkit';

@Injectable({ providedIn: 'root' })
export class MxStoreProductsService {
  mainImage$: Subject<ImageRef> = new Subject();
  galleyImage$: Subject<ImageRef> = new Subject();
  imageLoadPercent: any;

  constructor(
    private fs: AngularFirestore,
    private ft: AngularFireStorage,
    private _alerts: MxAlert,
    private location: Location
  ) {}

  async addProduct(product: MxStoreProductModel) {
    try {
      var productId: string = (product?.referencia || '')
        .split(' ')
        .join('-')
        .toLowerCase();
      var dotsSplit = productId.split('.');
      productId = dotsSplit.length == 1 ? productId : dotsSplit.join('_');

      Object.keys(product).forEach((key: string) => {
        if (product[key as keyof MxStoreProductModel] == undefined)
          delete product[key as keyof MxStoreProductModel];
      });
      var productObject: any = {};
      productObject = { ...productObject, ...product };
      productObject.id = productId;

      const colRef = this.fs.collection('tienda/productos/referencias').ref;

      var productCrated = await colRef.doc(productId).set(productObject);
      this._alerts.notify('Producto agregado');
      this.location.back();
      return true;
    } catch (error) {
      return console.log(error);
    }
  }

  async addProductImage(file: any) {
    try {
      const dateId = new Date().getTime(),
        fileName = `${dateId}-${file.name}`,
        path = `products/${fileName}`,
        ref = this.ft.ref(path),
        task = this.ft.upload(path, file);

      await task.percentageChanges().subscribe((res) => {
        return (this.imageLoadPercent = res);
      });

      await task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            await ref.getDownloadURL().subscribe((res) => {
              this.mainImage$.next({ url: res, alt: file.name });
            });
            return;
          })
        )
        .subscribe();
    } catch (error) {
      console.error(error);
      this._alerts.error('Error', error);
    }
  }

  async loadGalleryImage(image: any) {
    try {
      let dateId = new Date().getTime(),
        fileName = `${dateId}-${image.name}`,
        path = `products/${fileName}`,
        ref = this.ft.ref(path),
        task = this.ft.upload(path, image);

      await task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            await ref.getDownloadURL().subscribe((res) => {
              this.galleyImage$.next({ url: res, alt: image.name });
            });
            return;
          })
        )
        .subscribe();
    } catch (error) {
      console.error(error);
      this._alerts.error('Error', error);
    }
  }

  async getProduct(productId: string) {
    try {
      const productRef = this.fs
        .collection('tienda/productos/referencias')
        .ref.doc(productId);
      const productDoc = await productRef.get();
      var product = productDoc.data() as MxStoreProductModel;
      return product;
    } catch (error) {
      return console.log(error);
    }
  }

  async updateProduct(product: MxStoreProductModel) {
    try {
      var productObject = {};
      productObject = { ...productObject, ...product };

      const colRef = this.fs.collection('tienda/productos/referencias').ref;
      console.log(productObject);
      await colRef.doc(product.id).update(productObject);

      this._alerts.notify('Producto guardado');
      return true;
    } catch (error) {
      this._alerts.error('Ups, algo falló. No se guardó', error);
      return console.error(error);
    }
  }

  async onDelAttr(itemAttr: any) {
    try {
      var itemId = itemAttr.idItem,
        itemAttr = itemAttr.attrItem;
      const productRef = this.fs.collection('tienda/productos/referencias').ref;
      productRef.doc(itemId).update({
        [itemAttr]: firebase.firestore.FieldValue.delete(),
      });
      this._alerts.notify('Producto eliminado');
      return;
    } catch (error) {
      console.error(error);
      this._alerts.error('Error', error);
    }
  }

  async delProduct(productId: string) {
    try {
      const productRef = this.fs.collection('tienda/productos/referencias').ref;
      await productRef.doc(productId).delete();
      return true;
    } catch (error) {
      this._alerts.error('Error', error);
      return console.error(error);
    }
  }
}
