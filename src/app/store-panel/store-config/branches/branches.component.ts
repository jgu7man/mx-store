import { Component, OnInit } from '@angular/core';
import { BranchModel, DiaSemanal, HorarioLaboral } from './branch.model';
import { DeliveryAddress } from '../../../public/cart/order.model';
import { BranchesService } from './branches.service';

@Component({
  selector: 'gdev-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  sucursales: BranchModel[] = []
  nSucursal: BranchModel
  nHorarioLaboral: HorarioLaboral
  nUbicacion: DeliveryAddress
  

  constructor (public branchS: BranchesService) {
    this.nHorarioLaboral = { startTime: '', endTime: '', daysOfWeek: [] }
    this.nUbicacion = { address: '', depto: '', city: '', state: '', country: '', }
    this.nSucursal = new BranchModel('', this.nHorarioLaboral, this.nUbicacion )
   }

  ngOnInit(): void {
    this.getBrnaches()
  }

  addBranch() {
    this.sucursales.push( this.nSucursal )
    console.log(this.sucursales);
  }

  async getBrnaches() {
    this.sucursales = await this.branchS.getList()
  }

  onUpdate() {
    console.log('updated');
    this.getBrnaches()
  }

}
