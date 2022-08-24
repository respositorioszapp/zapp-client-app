import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowProductsPageRoutingModule } from './show-products-routing.module';

import { ShowProductsPage } from './show-products.page';
import { CommoncomponentsModule } from 'src/app/modules/commoncomponents/commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowProductsPageRoutingModule,
    CommoncomponentsModule
  ],
  declarations: [ShowProductsPage]
})
export class ShowProductsPageModule {}
