import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IntegrationsService {

  private renderer: Renderer2;

  pixelKey: any;
  analyticsKey: any;
  tagManagerKey: any;

  constructor (
    private fs: AngularFirestore,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
   }
  

  setScripts() {
    this.fs.collection( 'tienda' ).ref
      .doc( 'integrations' )
      .get().then( keys => {
        if ( keys.exists ) {
          let  data = keys.data()
          const keyMap = new Map<string, { model: any; script: any }>(
            [
              [ "pixel", {
                model: (key) => this.pixelKey = key,
                script: this.setPixelScript
              } ],
              [ "analytics", {
                model: (key) => this.analyticsKey = key,
                script: this.setAnalyticsScript
              } ],
              [ "tagmanager", {
                model: (key) => this.tagManagerKey = key,
                script: this.setTagManagerScript
              } ],
			]);
          keyMap.forEach( ( value, key ) => {
            if ( data[ key ] ) {
              value.model(data[key])
              value.script()
            }
          })
        }
      })
  }


  public setPixelScript = () => {
    let script = this.renderer.createElement( 'script' )
      script.text = `
      !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${this.pixelKey}');
    `
    this.renderer.appendChild( document.head, script)
  }


  public setAnalyticsScript = () => {
    let script = this.renderer.createElement( 'script' )
    script.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.analyticsKey}');
    `
    this.renderer.appendChild(document.head, script)
  }

  public setTagManagerScript = () => {
    let script = this.renderer.createElement( 'script' )
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ this.tagManagerKey}`
    this.renderer.appendChild(document.head, script)
  }
}
