import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDriverPageRoutingModule } from './add-driver-routing.module';

import { AddDriverPage } from './add-driver.page';
import { CommoncomponentsModule } from 'src/app/modules/commoncomponents/commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommoncomponentsModule,
    IonicModule,
    AddDriverPageRoutingModule
  ],
  declarations: [AddDriverPage]
})
export class AddDriverPageModule {}
