import { CartProductModel } from './cart-product.model';
import firebase from 'firebase/app'
export class OrderModel {
    constructor (
        public products: CartProductModel[],
        public totales: OrderTotales,
        public aviso?: string,
        public factura?: boolean,
        public order_date?: Date,
        public ship_method?: 'pickup' | 'delivery',
        public buyer?: Buyer,
        public delivery?: DeliveryAddress,
        public pickup?: PickupOrder,
        public pay_date?: Date | firebase.firestore.Timestamp,
        public pay_method?: string,
        public orderId?: string,
        public state?: 'pendiente' | 'entregado' | 'enviado' | 'cancelado'
    ){}
}

export interface Buyer {
    name: string,
    email: string,
    celular: string,
    id: string
}

export interface DeliveryAddress {
    address: string,
    depto: string,
    city: string,
    state: string,
    country: string,
    delivery_date?: Date | firebase.firestore.Timestamp
    orderId?: string
}

export interface PickupOrder {
    branch: string,
    pickup_date: Date | firebase.firestore.Timestamp,
    orderId?:string
    otherName?: string,
    otherId?:string
}

export interface ProductOrdered {
    id: string,
    reference: string,
    cant: number,
    unit_price: number,
    cant_price: number
}

export interface OrderTotales {
    grand_total: number,
    tax?: number,
    subtotal?: number,
}

