import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BranchModel, HorarioLaboral } from '../branch.model';
import { DeliveryAddress } from '../../../../public/cart/order.model';
import { BranchesService } from '../branches.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mx-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.scss']
})
export class BranchFormComponent implements OnInit {

  sucursal: BranchModel

  private _Sucursal : BehaviorSubject<any> = new BehaviorSubject({});
  @Input() set Sucursal(suc: any) { this._Sucursal.next(suc); }
  get Sucursal() { return this._Sucursal.getValue() }

  @Output() updated: EventEmitter<any> = new EventEmitter()
  horarioLaboral: HorarioLaboral
  ubicacion: DeliveryAddress

  constructor ( public branchS: BranchesService) {
    this.horarioLaboral = { startTime: '', endTime: '', daysOfWeek: [] }
    this.ubicacion = { address: '', depto: '', city: '', state: '', country: '', }
    this.sucursal = new BranchModel('',this.horarioLaboral,this.ubicacion  )
   }

  ngOnInit(): void {
    this._Sucursal.subscribe( suc => {
      if ( Object.keys( suc ).length > 0 ) {
        this.sucursal = suc
        this.horarioLaboral = suc.horario
        this.ubicacion = suc.ubicacion
        console.log(this.ubicacion);
      }
    } )
    this.branchS.onSave$.subscribe( save => {
      console.log(save);
      this.onSave()
    })
  }

  catchStartTime( value ) {
    this.horarioLaboral.startTime = value
  }

  catchEndTime( value ) {
    this.horarioLaboral.endTime = value
  }

  catchFormChanges( changes ) {
    this.ubicacion = changes.branch
  }

  onSave() {
    this.sucursal.horario = this.horarioLaboral
    this.sucursal.ubicacion = this.ubicacion
    console.log(this.sucursal);
    this.branchS.save( this.sucursal ).then( () =>{
      console.log('guardado')
      this.updated.emit()
    })
  }

}
