import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeSummaryPageRoutingModule } from './time-summary-routing.module';

import { TimeSummaryPage } from './time-summary.page';
import { CommoncomponentsModule } from 'src/app/modules/commoncomponents/commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommoncomponentsModule,
    TimeSummaryPageRoutingModule
  ],
  declarations: [TimeSummaryPage]
})
export class TimeSummaryPageModule {}
