import { Addon, MxStoreProductModel } from 'src/app/store-panel/products/product.model';

export interface CartProductModel {
    productId?: string,
    unit_precio?: number
    cant?: number,
    variante?: {
        name?: string,
        option?: Addon
    },
    adiciones?: Addon[]
  description?: MxStoreProductModel,
  added?: Date | undefined
}

