import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MainPanelService } from '../main-panel.service';

@Component({
  selector: 'gdev-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, OnDestroy {

  brandSubscription: Subscription
  constructor(
    private _admin: MainPanelService,
    private _meta: Meta
  ) {
    this.brandSubscription =
      this._admin.getBrandInfo().subscribe(info => {
        if (info) {
        }
      })
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.brandSubscription.unsubscribe();
  }

}
