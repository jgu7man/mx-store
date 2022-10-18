import { PreferenceItem, PreferenceBackUrl } from 'mercadopago/models/preferences/create-payload.model';

export interface MercadopagoRequest {
    access_token:string
    items: PreferenceItem[],
    action: mercadopagoAction,
    back_urls?: PreferenceBackUrl;
}

export type mercadopagoAction = 'create' | 'success' | 'pending' | 'failure'
