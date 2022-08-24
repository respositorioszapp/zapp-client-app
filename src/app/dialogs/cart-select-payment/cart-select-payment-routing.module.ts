import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartSelectPaymentPage } from './cart-select-payment.page';

const routes: Routes = [
  {
    path: '',
    component: CartSelectPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartSelectPaymentPageRoutingModule {}
