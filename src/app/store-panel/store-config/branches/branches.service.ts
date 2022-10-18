import { Injectable } from '@angular/core';
import { DiaSemanal, BranchModel } from './branch.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { MxAlert } from '@marxa/devkit';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  sucursalesList: BranchModel[] = []
  onSave$ = new Subject<boolean>()

  constructor (
    private fs: AngularFirestore,
    private _alert: MxAlert
  ) { }





  async save( sucursal: BranchModel ) {
    try {

      console.log(sucursal);
      if ( sucursal.id ) {
        this.fs.collection('tienda/pickup/sucursales').ref.doc(sucursal.id).set({...sucursal}, {merge: true})
      } else {
        sucursal.id = ''
        this.fs.collection( 'tienda/pickup/sucursales' ).ref.add( { ...sucursal } )
          .then( nu => nu.update( { id: nu.id } ) )
          .catch(error => console.log(error))
      }



      return
    } catch (error) {
        console.error(error);
        this._alert.error('Error al guardar', error)
    }
  }







  async getList() {
    const ref = this.fs.collection( 'tienda/pickup/sucursales' ).ref
    var docs = await ref.get()

    if ( docs.size > 0 ) {
      docs.forEach( doc => this.sucursalesList.push(doc.data() as BranchModel ))
    }

    return this.sucursalesList
  }

  semana: DiaSemanal[] = [
    { value: 0, viewValue: 'Domingo' },
    { value: 1, viewValue: 'Lunes' },
    { value: 2, viewValue: 'Martes' },
    { value: 3, viewValue: 'Miércoles' },
    { value: 4, viewValue: 'Jueves' },
    { value: 5, viewValue: 'Viernes' },
    { value: 6, viewValue: 'Sábado' },
  ]

  horario = [
    '08:00',
    '08:15',
    '08:30',
    '08:45',
    '09:00',
    '09:15',
    '09:30',
    '09:45',
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '11:45',
    '12:00',
    '12:15',
    '12:30',
    '12:45',
    '13:00',
    '13:15',
    '13:30',
    '13:45',
    '14:00',
    '14:15',
    '14:30',
    '14:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
  ]
}
