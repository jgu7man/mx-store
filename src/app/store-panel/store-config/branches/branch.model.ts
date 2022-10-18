import { DeliveryAddress } from "src/app/public/cart/order.model"


export class BranchModel {
constructor(
    public displayName: string,
    public horario?: HorarioLaboral,
    public ubicacion?: DeliveryAddress,
    public id?: string
    ) { }


}

export interface DiaSemanal {
    value: any,
    viewValue: string
}


export interface HorarioLaboral {
    /**
     * Muestra un sombreado del horario laboral
     * @usage
     *
     * Asigna horario agrupado por bloques.
     * Ej. En un horario corrido de 8am a 2pm de lunes a viernes
     * el objeto se configura: {
     *   de: '08:00',
     *   a: '14:00',
     *   dias: [1,2,3,4,5]
     * }
     */

    startTime: string | HoraMin,
    endTime: string | HoraMin,
    daysOfWeek: number[]
}

export interface HoraMin {
    hora: number,
    min: number
}
