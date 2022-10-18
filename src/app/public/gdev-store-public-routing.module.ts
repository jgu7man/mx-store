import { WishlistComponent } from './wishlist/wishlist.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AparadorComponent } from './aparador/aparador.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaComponent } from './categorias/categoria/categoria.component';
import { ProductComponent } from './product/product.component';
import { ClientesLoginComponent } from './clientes/clientes-login/clientes-login.component';
import { CuentaComponent } from './clientes/cuenta/cuenta.component';
import { DatosCuentaComponent } from './clientes/cuenta/datos-cuenta/datos-cuenta.component';
import { CartComponent } from './cart/cart.component';
import { ShipFormComponent } from './cart/ship-form/ship-form.component';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';
import { GdevStorePublicComponent } from './gdev-store-public.component';
import { PayFormComponent } from './cart/pay-form/pay-form.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DocsComponent } from './docs/docs.component';
import { PrivacidadComponent } from './docs/privacidad/privacidad.component';

const moduleTitle = 'Las motos'

const routes: Routes = [
  {
    path: '', component: GdevStorePublicComponent, data: { title: `${ moduleTitle } - Tienda` }, children: [
      { path: '', redirectTo: 'aparador', pathMatch: 'full' },
      { path: 'aparador', component: AparadorComponent, data: { title: `${ moduleTitle } - Aparador`, aparador:true } },
      { path: 'aparador/:id', component: AparadorComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'categoria/:catego', component: CategoriaComponent },
      { path: 'categoria/:catego/:id', component: ProductComponent },
      { path: 'producto/:id', component: ProductComponent },
      { path: 'login', component: ClientesLoginComponent },
      { path: 'cuenta', component: CuentaComponent, children:[
        { path: '', pathMatch: 'full', redirectTo: 'datos' },
        { path: 'datos', component: DatosCuentaComponent },
        { path: 'cart', component: CartComponent },
        { path: 'ship', component: ShipFormComponent },
        { path: 'pay', component: PayFormComponent },
        { path: 'wishlist', component: WishlistComponent },
        { path: 'pedidos/:state', component: PedidosComponent },
      ] },
      { path: 'resultados', component: ResultadosBusquedaComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'docs', component: DocsComponent, children: [
        { path: 'politicas-de-privacidad', component: PrivacidadComponent },
      ] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GdevStorePublicRoutinModule { }
