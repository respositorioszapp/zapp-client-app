import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectClientCityPageRoutingModule } from './select-client-city-routing.module';

import { SelectClientCityPage } from './select-client-city.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectClientCityPageRoutingModule
  ],
  declarations: [SelectClientCityPage]
})
export class SelectClientCityPageModule {}
