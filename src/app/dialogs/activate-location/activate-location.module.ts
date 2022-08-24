import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivateLocationPageRoutingModule } from './activate-location-routing.module';

import { ActivateLocationPage } from './activate-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivateLocationPageRoutingModule
  ],
  declarations: [ActivateLocationPage]
})
export class ActivateLocationPageModule {}
