import { MxStoreProductModel } from 'src/app/store-panel/products/product.model';
export class WishlistProduct {
    constructor (
        public productId: string,
        public agregado?: Date | string,
        public description?: MxStoreProductModel
    ){}
}
