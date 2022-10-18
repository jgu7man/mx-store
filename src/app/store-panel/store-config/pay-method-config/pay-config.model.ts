export class PayConfigModel {
constructor(
    public avalibleMethods?: string[],
    public paypalData?: PaypalData,
    public mercadopagoData?: MercadopagoData
){}
}

export interface PaypalData {
    sandboxClientID:string
    liveClientID: string
}

export interface MercadopagoData {
    testAccessToken: string
    prodAccessToken: string
}