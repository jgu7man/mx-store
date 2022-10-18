import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileNavbarService {

  toggleMenu: Subject<boolean> = new Subject()
  public open: boolean = false

  title: string = 'Las motos'

  constructor() { }
}
