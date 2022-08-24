import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectDriverPageRoutingModule } from './select-driver-routing.module';

import { SelectDriverPage } from './select-driver.page';
import { CommoncomponentsModule } from 'src/app/modules/commoncomponents/commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectDriverPageRoutingModule,
    CommoncomponentsModule
  ],
  declarations: [SelectDriverPage],
  providers: [DatePipe]
})
export class SelectDriverPageModule {}
