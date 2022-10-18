import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Addon } from '../product.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mx-prod-addons',
  templateUrl: './prod-addons.component.html',
  styleUrls: ['./prod-addons.component.scss']
})
export class ProdAddonsComponent implements OnInit {

  private _addons = new BehaviorSubject<Addon[]>([])
  @Input() set Addons( add: Addon[] ) { this._addons.next( add ) }
  get Addons(){ return this._addons.getValue()}

  addons: Addon[] = []
  nuAddon: Addon = { ref: '', precio: 0 }

  @Output() onChange: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this._addons.subscribe(value => this.addons = value)
  }

  onAddAddon() {
    if(this.addons == undefined) this.addons = []
    this.addons.push( this.nuAddon )
    this.nuAddon = { ref: '', precio: 0 }
    this.onChange.emit( this.addons )
  }

  deleteAddon( i ) {
    this.addons.splice( i, 1 )
    this.onChange.emit( this.addons )
  }

}
