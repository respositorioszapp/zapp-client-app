import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartSelectPaymentPageRoutingModule } from './cart-select-payment-routing.module';

import { CartSelectPaymentPage } from './cart-select-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartSelectPaymentPageRoutingModule
  ],
  declarations: [CartSelectPaymentPage]
})
export class CartSelectPaymentPageModule {}
