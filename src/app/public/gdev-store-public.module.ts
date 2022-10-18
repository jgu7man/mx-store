import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GdevStorePublicRoutinModule } from './gdev-store-public-routing.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export var options: Partial<IConfig> | ( () => Partial<IConfig> );



import { CategoriasComponent } from './categorias/categorias.component';
import { ProductComponent, ProductReviewComponent } from './product/product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductGalleryComponent } from './product/product-gallery/product-gallery.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaComponent } from './categorias/categoria/categoria.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesLoginComponent } from './clientes/clientes-login/clientes-login.component';
import { CuentaComponent } from './clientes/cuenta/cuenta.component';
import { LoginFormComponent } from './clientes/clientes-login/login-form/login-form.component';
import { RegisterFormComponent } from './clientes/clientes-login/register-form/register-form.component';
import { SidenavComponent } from './clientes/cuenta/sidenav/sidenav.component';
import { MainMenuComponent } from './clientes/cuenta/sidenav/main-menu/main-menu.component';
import { DatosCuentaComponent } from './clientes/cuenta/datos-cuenta/datos-cuenta.component';
import { CartComponent } from './cart/cart.component';
import { AddcartBtnComponent } from './cart/addcart-btn/addcart-btn.component';
import { ProductOnCartComponent } from './cart/product-on-cart/product-on-cart.component';
import { PayFormComponent } from './cart/pay-form/pay-form.component';
import { ProductActionsComponent } from './product/product-actions/product-actions.component';
import { ShipFormComponent, PickupAdverticeComponent } from './cart/ship-form/ship-form.component';
import { PickupFormComponent } from './cart/ship-form/pickup-form/pickup-form.component';
import { DeliveryFormComponent } from './cart/ship-form/delivery-form/delivery-form.component';
import { GdevStorePublicComponent } from './gdev-store-public.component';
import { PopupLoginComponent } from './clientes/clientes-login/popup-login/popup-login.component';
import { AparadorComponent } from './aparador/aparador.component';
import { DestacadosComponent } from './aparador/destacados/destacados.component';
import { FooterComponent } from './footer/footer.component';
import { PayMethodsComponent } from './cart/pay-methods/pay-methods.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoComponent } from './pedidos/pedido/pedido.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FormTemplateComponent } from './contacto/form-template/form-template.component';
import { DocsComponent } from './docs/docs.component';
import { PrivacidadComponent } from './docs/privacidad/privacidad.component';
import { DinamicPriceComponent } from './cart/dinamic-price/dinamic-price.component';
import { GalleryScrollThumbnailComponent } from './product/gallery-scroll-thumbnail/gallery-scroll-thumbnail.component';
import { MaterialModule } from '../shared/material.module';
import { SliderComponent } from './slider/slider.component';
import { TiendaNavbarComponent } from './tienda-navbar/tienda-navbar.component';
import { MenuCategoriasComponent } from './tienda-navbar/menu-categorias/menu-categorias.component';
import { MenuPaginaComponent } from './tienda-navbar/menu-pagina/menu-pagina.component';
import { MenuCuentaComponent } from './tienda-navbar/menu-cuenta/menu-cuenta.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MenuMobileComponent } from './tienda-navbar/menu-mobile/menu-mobile.component';
import { MainMenuMobileComponent } from './tienda-navbar/menu-mobile/main-menu-mobile/main-menu-mobile.component';
import { AddWishlistComponent } from './wishlist/add-wishlist/add-wishlist.component';
import { ProductOnWishlistComponent } from './wishlist/product-on-wishlist/product-on-wishlist.component';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';
import { UserAreaComponent } from './tienda-navbar/user-area/user-area.component';

@NgModule({
  declarations: [
    GdevStorePublicComponent,

    SliderComponent,
    TiendaNavbarComponent,
    MenuCategoriasComponent,
    CategoriasComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductGalleryComponent,
    ProductReviewComponent,
    CategoriaComponent,
    MenuPaginaComponent,
    ClientesComponent,
    ClientesLoginComponent,
    MenuCuentaComponent,
    CuentaComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SidenavComponent,
    MainMenuComponent,
    DatosCuentaComponent,
    CartComponent,
    WishlistComponent,
    AddcartBtnComponent,
    ProductOnCartComponent,
    PayFormComponent,
    MenuMobileComponent,
    MainMenuMobileComponent,
    ProductActionsComponent,
    AddWishlistComponent,
    ShipFormComponent,
    PickupAdverticeComponent,
    PickupFormComponent,
    DeliveryFormComponent,
    ProductOnWishlistComponent,
    ResultadosBusquedaComponent,
    PopupLoginComponent,
    AparadorComponent,
    DestacadosComponent,
    FooterComponent,
    UserAreaComponent,
    PayMethodsComponent,
    PedidosComponent,
    PedidoComponent,
    ContactoComponent,
    FormTemplateComponent,
    DocsComponent,
    PrivacidadComponent,
    DinamicPriceComponent,
    GalleryScrollThumbnailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GdevStorePublicRoutinModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
    NgxMaterialTimepickerModule,
  ],
  exports: [
    GdevStorePublicComponent,
  ],
  entryComponents: [
    ProductReviewComponent,
    PickupAdverticeComponent,
    PopupLoginComponent
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ]
})
export class GdevStorePublicModule { }
