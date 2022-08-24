import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectAddressPageRoutingModule } from './select-address-routing.module';

import { SelectAddressPage } from './select-address.page';
import { CommoncomponentsModule } from 'src/app/modules/commoncomponents/commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommoncomponentsModule,
    SelectAddressPageRoutingModule
  ],
  declarations: [SelectAddressPage]
})
export class SelectAddressPageModule {}
