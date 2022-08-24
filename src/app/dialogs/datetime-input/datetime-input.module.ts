import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatetimeInputPageRoutingModule } from './datetime-input-routing.module';

import { DatetimeInputPage } from './datetime-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatetimeInputPageRoutingModule
  ],
  declarations: [DatetimeInputPage]
})
export class DatetimeInputPageModule {}
