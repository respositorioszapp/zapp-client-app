import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportTypePageRoutingModule } from './transport-type-routing.module';

import { TransportTypePage } from './transport-type.page';
import { CommoncomponentsModule } from 'src/app/modules/commoncomponents/commoncomponents.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    CommoncomponentsModule,
    TransportTypePageRoutingModule
  ],
  declarations: [TransportTypePage]
})
export class TransportTypePageModule {}
