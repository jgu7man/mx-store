import {
  Addon,
  ImageRef,
  MxStoreProductModel,
} from 'src/app/store-panel/products/product.model';

export interface CartProductModel {
  id: string,
  // mainImage: ImageRef,
  description: MxStoreProductModel,
  unit_precio: number,
  cant: number,
  variante?: {
    name?: string,
    option?: Addon,
  },
  adiciones?: Addon[],
  added: Date,
}
