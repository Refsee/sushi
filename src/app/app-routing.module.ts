import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminActionComponent } from './admin/admin-action/admin-action.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminGoodsComponent } from './admin/admin-goods/admin-goods.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminComponent } from './admin/admin.component';
import { AboutComponent } from './pages/about/about.component';
import { ActionInfoComponent } from './pages/action-info/action-info.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { HomeComponent } from './pages/home/home.component';
import { OfertaComponent } from './pages/oferta/oferta.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ActionResolver } from './shared/resolves/action.resolver';
import { ProductResolver } from './shared/resolves/product.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'action', component: ActionsComponent,
  },
  { path: 'action/:id', component: ActionInfoComponent,
    resolve: {
      actionInfo: ActionResolver,
    },
  },
  { path: 'product/:category', component: ProductComponent,
  },
  { path: 'product/:category/:id',
    component: ProductInfoComponent,
    resolve: {
      productInfo: ProductResolver,
    },
  },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dogovir-oferta', component: OfertaComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'action', component: AdminActionComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'goods', component: AdminGoodsComponent },
      { path: 'order', component: AdminOrderComponent },
      { path: '', redirectTo: 'action', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
