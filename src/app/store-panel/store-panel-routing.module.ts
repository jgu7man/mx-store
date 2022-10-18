import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { GdevCategoryAttributesComponent } from './categories/category-attributes/category-attributes.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreSliderComponent } from './store-design/store-slider/store-slider.component';
import { StoreConfigComponent } from './store-config/store-config.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { StorePanelComponent } from './store-panel.component';
import { ClientesComponent } from '../panel/clientes/clientes.component';
import { SliderConfigComponent } from './store-design/store-slider/slider-config/slider-config.component';

const routes: Routes = [
  { path: '', component: StorePanelComponent, children:[
    { path: '', pathMatch: 'full', redirectTo: '/panel/tienda/inicio' },
    { path: 'inicio', component: DashboardComponent },
    { path: 'config', component: StoreConfigComponent },
    { path: 'config/:state', component: StoreConfigComponent},
    { path: 'categories', component: CategoriesComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'attributes/:id', component: GdevCategoryAttributesComponent },
    { path: 'products/add', component: AddProductComponent },
    { path: 'products/edit/:id', component: EditProductComponent },

    {path: 'import-export', component: ImportExportComponent},

    { path: 'slider', component: StoreSliderComponent },
    { path: 'slider-config', component: SliderConfigComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'pedidos', component: PedidosComponent },
  ]
  },
];
const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'disabled',
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorePanelRoutinModule { }
