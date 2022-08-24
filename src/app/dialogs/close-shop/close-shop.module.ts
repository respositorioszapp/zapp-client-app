import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseShopPageRoutingModule } from './close-shop-routing.module';

import { CloseShopPage } from './close-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CloseShopPageRoutingModule
  ],
  declarations: [CloseShopPage]
})
export class CloseShopPageModule {}
