import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LittleAlertPageRoutingModule } from './little-alert-routing.module';

import { LittleAlertPage } from './little-alert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LittleAlertPageRoutingModule
  ],
  declarations: [LittleAlertPage]
})
export class LittleAlertPageModule {}
