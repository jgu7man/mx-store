export class MxStoreProductModel {
    constructor (
        public referencia: string,
        public precio: number,
        public onStock: boolean = false,
        public stockCant: number,
        public mainImage?: ImageRef,
        public descripcion: string = '',
        public categorias: string[] = [],
        public galeria: ImageRef[] = [],
        public variantes?: ProdVariante[],
        public addons?: Addon[],
        public descuento?: ProdDesc,
        public detalles?: ProdDetalle[],
        public id?: string,
    ) { }
}


export interface ProdVariante {
    name: string,
    variantes?: Addon[]
}

export interface Addon {
    ref?: string,
    precio?: number
}

export interface ProdDesc {
    cant?: number,
    type?: '%' | '$',
    exp?: any
}

export interface ProdDetalle {
    detailName: string,
    detailValue: any
}

export interface ImageRef {
  url: string,
  alt: string
}
