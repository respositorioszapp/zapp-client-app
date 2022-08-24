import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DummyCreateOrderPageRoutingModule } from './dummy-create-order-routing.module';

import { DummyCreateOrderPage } from './dummy-create-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DummyCreateOrderPageRoutingModule
  ],
  declarations: [DummyCreateOrderPage]
})
export class DummyCreateOrderPageModule {}
