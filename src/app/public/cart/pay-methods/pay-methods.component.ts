import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PayMethodsService } from 'src/app/store-panel/store-config/pay-method-config/pay-methods.service';

@Component({
  selector: 'gdev-pay-methods',
  templateUrl: './pay-methods.component.html',
  styleUrls: ['./pay-methods.component.scss']
})
export class PayMethodsComponent implements OnInit {

  avalibleMethods: string[] = []
  @Output() methodSelected: EventEmitter<string> = new EventEmitter()

  constructor (
    public payConfigS: PayMethodsService
  ) { }

  ngOnInit(): void {
    this.getMethods()
  }

  async getMethods() {
    const config = await this.payConfigS.getAvalibleMethods();
    if (!config) throw new Error( 'No existe configuración')
    this.avalibleMethods = config!.avalibleMethods!
  }


  onExpand( item: any ) {
    console.log('Método de pago: ', item);
    this.methodSelected.emit(item)
  }




}
