import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'panel', loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule) }, { path: 'panel', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
