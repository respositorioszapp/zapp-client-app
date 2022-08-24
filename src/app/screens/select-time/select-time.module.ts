import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTimePageRoutingModule } from './select-time-routing.module';

import { SelectTimePage } from './select-time.page';
import { CommoncomponentsModule } from 'src/app/modules/commoncomponents/commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommoncomponentsModule,
    SelectTimePageRoutingModule
  ],
  declarations: [SelectTimePage]
})
export class SelectTimePageModule {}
