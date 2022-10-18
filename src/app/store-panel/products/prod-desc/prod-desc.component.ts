import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProdDesc } from '../product.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mx-prod-desc',
  templateUrl: './prod-desc.component.html',
  styleUrls: ['./prod-desc.component.scss']
})
export class ProdDescComponent implements OnInit {

  descuento: ProdDesc = { cant: 0, type: '%', exp: new Date() }
  private _desc = new BehaviorSubject<ProdDesc>(this.descuento)
  @Input() set Desc( desc: ProdDesc ) { this._desc.next( desc ) }
  get Desc() { return this._desc.getValue()}

  @Output() OnChange: EventEmitter<any> = new EventEmitter()
  tiposDesc: TipoDesc[] = [
    { value: '%', viewValue: 'por ciento' },
    { value: '$', viewValue: 'bonificación'}
  ]

  constructor() { }

  ngOnInit(): void {
    this._desc.subscribe(value => this.descuento = value)
  }

}

interface TipoDesc {
  value: string,
  viewValue: string
}
