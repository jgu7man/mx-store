import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MxAlert } from '@marxa/devkit';
import { IntegrationsService } from './integrations.service';


@Component({
  selector: 'mx-integrations-config',
  templateUrl: './integrations-config.component.html',
  styleUrls: ['./integrations-config.component.scss']
})
export class IntegrationsConfigComponent implements OnInit {


  constructor (
    private fs: AngularFirestore,
    private _alerts: MxAlert,
    public integrations_: IntegrationsService,
  ) {
    }

  ngOnInit(): void {
    this.integrations_.setScripts()
  }


  setKey( key: string ) {
    const valueMap = new Map<string, {value: string, script: any}>( [
      [ 'pixel', {
        value: this.integrations_.pixelKey,
        script: this.integrations_.setPixelScript
      } ],
      [ 'analytics', {
        value: this.integrations_.analyticsKey,
        script: this.integrations_.setAnalyticsScript
      } ],
      [ 'tagmanager', {
        value: this.integrations_.tagManagerKey,
        script: this.integrations_.setTagManagerScript
      } ]
    ] )

    this.fs.collection( 'tienda' ).ref.doc( 'integrations' )
      .set( { [key]: valueMap.get(key)!.value } )
      .then( () => {
        this._alerts.notify( key + ' guardado' )
        return valueMap.get(key)!.script()
      } )
  }



}
