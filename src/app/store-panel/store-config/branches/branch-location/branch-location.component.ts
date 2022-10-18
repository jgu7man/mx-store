import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { DeliveryAddress } from '../../../../public/cart/order.model';

@Component({
  selector: 'gdev-branch-location',
  templateUrl: './branch-location.component.html',
  styleUrls: ['./branch-location.component.scss']
})
export class BranchLocationComponent implements OnInit {

  ubicacion: DeliveryAddress
  private _Ubicacion: BehaviorSubject<any> = new BehaviorSubject( { address: '', depto: '', city: '', state: '', country: '', });
  @Input() set Ubicacion(value: any) { this._Ubicacion.next(value); }
  get Ubicacion() { return this._Ubicacion.getValue()}

  @Output() formChanges: EventEmitter<any> = new EventEmitter()
  constructor (
  ) {
    this.ubicacion = { address: '', depto: '', city: '', state: '', country: '', }
  }

  ngOnInit(): void {
    this._Ubicacion.subscribe( ubi => {
      this.ubicacion = ubi
    })
  }

  
 
}
