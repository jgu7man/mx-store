// import { ProdlistReadrModule } from './../../prodlist-readr-module/prodlist-readr.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorePanelRoutinModule } from './store-panel-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


import { StorePanelComponent } from './store-panel.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { DelCategoryComponent } from './categories/del-category/del-category.component';
import { CategoryTableComponent } from './categories/category-table/category-table.component';
import { CategoryFieldsComponent } from './categories/category-fields/category-fields.component';
import { ProductsComponent } from './products/products.component';
import { MxCategoryAttributesComponent } from './categories/category-attributes/category-attributes.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
// import { DelProdcutComponent } from './products/del-prodcut/del-prodcut.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreDesignComponent } from './store-design/store-design.component';
import { StoreSliderComponent } from './store-design/store-slider/store-slider.component';
import { AddSlideComponent } from './store-design/store-slider/add-slide/add-slide.component';
import { SlideComponent } from './store-design/store-slider/slide/slide.component';
import { ProdVarianteComponent } from './products/prod-variante/prod-variante.component';
import { ProdAddonsComponent } from './products/prod-addons/prod-addons.component';
import { ProdDescComponent } from './products/prod-desc/prod-desc.component';
import { StoreConfigComponent } from './store-config/store-config.component';
import { DeliveryConfigComponent } from './store-config/delivery-config/delivery-config.component';
import { BranchesComponent } from './store-config/branches/branches.component';
import { BranchLocationComponent } from './store-config/branches/branch-location/branch-location.component';
import { BranchFormComponent } from './store-config/branches/branch-form/branch-form.component';
import { PayMethodConfigComponent } from './store-config/pay-method-config/pay-method-config.component';
import { PedidosComponent } from "./pedidos/pedidos.component";
import { PedidoComponent } from "./pedidos/pedido/pedido.component";
import { ProdDetailsComponent } from './products/prod-details/prod-details.component';
import { PaypalConfigComponent } from './store-config/pay-method-config/paypal-config/paypal-config.component';
import { MercadoConfigComponent } from './store-config/pay-method-config/mercado-config/mercado-config.component';
import { PayStateComponent } from './store-config/pay-method-config/mercado-config/pay-state/pay-state.component';
import { IntegrationsConfigComponent } from './store-config/integrations-config/integrations-config.component';
import { ImportExportComponent } from './import-export/import-export.component';

import { ProductsConfigComponent } from './store-config/products-config/products-config.component';
import { DelProdcutComponent } from './products/del-prodcut/del-prodcut.component';
import { GdevComponentsModule } from '../gdev-components/gdev-components.module';
import { MxStorageModule, MxTableImporterModule } from '@marxa/carrier';
import { SliderConfigComponent } from './store-design/store-slider/slider-config/slider-config.component';
import { MxIndexModule } from '@marxa/index';
import { MxDateTimeModule, MxTextModule } from '@marxa/devkit';
import { MxCrudPanelModule } from '@marxa/crud-panel';


@NgModule( {
  declarations: [
    StorePanelComponent,

    CategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DelCategoryComponent,
    CategoryTableComponent,
    CategoryFieldsComponent,
    MxCategoryAttributesComponent,

    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    DelProdcutComponent,
    DashboardComponent,



    StoreDesignComponent,
    StoreSliderComponent,
    AddSlideComponent,
    SlideComponent,

    ProdVarianteComponent,
    ProdAddonsComponent,
    ProdDescComponent,



    StoreConfigComponent,
    DeliveryConfigComponent,
    BranchesComponent,
    BranchLocationComponent,
    BranchFormComponent,
    PayMethodConfigComponent,
    PedidosComponent,
    PedidoComponent,
    ProdDetailsComponent,
    PaypalConfigComponent,
    MercadoConfigComponent,
    PayStateComponent,
    IntegrationsConfigComponent,

    ImportExportComponent,
    ProductsConfigComponent,
    SliderConfigComponent
  ],
  imports: [
    CommonModule,
    StorePanelRoutinModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GdevComponentsModule,
    NgxMaterialTimepickerModule,
    // ProdlistReadrModule,
    MxStorageModule,
    MxTableImporterModule,
    MxIndexModule,
    MxTextModule,
    MxDateTimeModule,
    MxCrudPanelModule,
  ],
  entryComponents: [

  ],
  exports: [
    StorePanelComponent
  ]
})
export class MxStorePanelModule { }
