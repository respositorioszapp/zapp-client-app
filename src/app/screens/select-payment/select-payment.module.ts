import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPaymentPageRoutingModule } from './select-payment-routing.module';

import { SelectPaymentPage } from './select-payment.page';
import { CommoncomponentsModule } from 'src/app/modules/commoncomponents/commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommoncomponentsModule,
    SelectPaymentPageRoutingModule
  ],
  declarations: [SelectPaymentPage]
})
export class SelectPaymentPageModule {}
