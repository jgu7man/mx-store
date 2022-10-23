import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PickupOrder, DeliveryAddress } from '../../order.model';
import { ShipService } from '../ship.service';
import { CartService } from '../../cart.service';
import { MxAlert } from '@marxa/devkit';
import { MatDialog } from '@angular/material/dialog';
import { PopupLoginComponent } from '../../../clientes/clientes-login/popup-login/popup-login.component';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BranchModel, HoraMin, HorarioLaboral } from 'src/app/store-panel/store-config/branches/branch.model';
import { BranchesService } from 'src/app/store-panel/store-config/branches/branches.service';

@Component({
  selector: 'app-pickup-form',
  templateUrl: './pickup-form.component.html',
  styleUrls: ['./pickup-form.component.scss']
})
export class PickupFormComponent implements OnInit {

  pickupForm: PickupOrder
  pickupByOther: boolean = false
  cita_disponible: string = ''
  eventDuration: string = '00:15'

  branches: BranchModel[] = []
  horarioLaboral?: HorarioLaboral
  ubicacion?: DeliveryAddress


  pickup_date?:Date
  pickup_hour?: string

  @Output() pickupChanges = new EventEmitter<any>();
  @Output() public setUbication = new EventEmitter<any>();

  constructor (
    private _ship: ShipService,
    private _cart: CartService,
    private _alerta: MxAlert,
    private _dialog: MatDialog,
    private _branches: BranchesService
  ) {
    this.pickupForm = {
      branch: '',
      pickup_date: new Date(),
    }
   }

  ngOnInit(): void {
    this.getBranches()
  }

  async getBranches() {
   this.branches  = await this._branches.getList()
  }

  setBranchHours(change: MatSelectChange) {
    var branch = this.branches.find( b => b.displayName == change.value )
    if ( branch ) {
      this.horarioLaboral = branch.horario
      this.setUbication.emit(branch.ubicacion)
      this.pickupChanges.emit( {pickup: this.pickupForm, valid: this.validatePickup} )
    }
  }


  async clickDate( fecha: any ) {

    var horarioValido = await this._ship.checkHorarioValido( fecha, this.pickupForm.branch, 'pickup' )
    if ( horarioValido ) {

      this.pickupForm.pickup_date = fecha
      this.cita_disponible = 'disponible'

    } else {
    }

    this.pickupChanges.emit( {pickup: this.pickupForm, valid: this.validatePickup} )

  }

  async setPickupDate(event: any) {
    console.log( this.pickup_date, event );
    this.pickup_hour = event
    let hour = +this.pickup_hour!.split( ':' )[ 0 ]
    let min = +this.pickup_hour!.split( ':' )[ 1 ]
    if ( this.pickup_date ) {
      this.pickup_date.setHours( hour, min )
      var horarioValido = await this._ship.checkHorarioValido( this.pickup_date, this.pickupForm.branch, 'pickup' )
      if ( horarioValido ) {

        this.pickupForm.pickup_date = this.pickup_date
        this.cita_disponible = 'disponible'

      } else {
        this._alerta.message('Esta fecha está ocupada ¿podrías elegir otra por favor?')
      }

    }

    this.pickupChanges.emit( {pickup: this.pickupForm, valid: this.validatePickup} )
  }

  get validatePickup() {
    if (
      !this.pickupForm.branch &&
      !this.pickupForm.pickup_date
    ) { return false }
    else if ( this.pickupByOther && !this.pickupForm.otherName ) {
      return false
    } else { return true}
  }

  savePickup() {
    console.log(this.pickupForm);
    // localStorage.setItem( 'lasmotosship', JSON.stringify( this.pickupForm ) )
    var cliente = this._cart.LocalClient
    if ( !cliente ) {
      this._dialog.open( PopupLoginComponent, {
        minWidth: '400px'
      })
    } else {
      // NOTE agregar el método de pago y posteriormente guardar la cita
      // this._ship.saveCita( this.pickupForm ).then( () => {})
    }

  }

  HoraMin( value: string | HoraMin ) {
    if ( typeof value !== 'string' ) {
      return `${value.hora}:${value.min}`
    }
    return value
  }


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
