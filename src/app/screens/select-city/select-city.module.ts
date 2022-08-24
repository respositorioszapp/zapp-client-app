import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCityPageRoutingModule } from './select-city-routing.module';

import { SelectCityPage } from './select-city.page';
import { CommoncomponentsModule } from 'src/app/modules/commoncomponents/commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommoncomponentsModule,
    IonicModule,
    SelectCityPageRoutingModule
  ],
  declarations: [SelectCityPage]
})
export class SelectCityPageModule {}
