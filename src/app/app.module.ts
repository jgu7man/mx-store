import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { FirebaseModule } from './shared/firebase.module';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    // ServiceWorkerModule.register( 'ngsw-worker.js', { enabled: environment.production } ),
    AngularFireModule.initializeApp( environment.firebaseConfig ),
    FirebaseModule,
    // CommonModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
