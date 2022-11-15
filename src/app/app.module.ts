import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { ActionInfoComponent } from './pages/action-info/action-info.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { RolesComponent } from './pages/roles/roles.component';
import { SetsComponent } from './pages/sets/sets.component';
import { DrinkComponent } from './pages/drink/drink.component';
import { SaucesComponent } from './pages/sauces/sauces.component';
import { OfertaComponent } from './pages/oferta/oferta.component';
import { AdminComponent } from './admin/admin.component';
import { AdminActionComponent } from './admin/admin-action/admin-action.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminGoodsComponent } from './admin/admin-goods/admin-goods.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, AboutComponent, HomeComponent, ActionsComponent, ActionInfoComponent, DeliveryComponent, RolesComponent, SetsComponent, DrinkComponent, SaucesComponent, OfertaComponent, AdminComponent, AdminActionComponent, AdminCategoryComponent, AdminGoodsComponent, AdminOrderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
