import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from 'src/app/components/stepper/stepper.component';
import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { DriverPopoverComponent } from 'src/app/components/driver-popover/driver-popover.component';
import { ProductComponent } from 'src/app/components/product/product.component';
import { DateFormatHourPipe } from 'src/app/pipes/date-format-hour.pipe';
import { BannersComponent } from 'src/app/components/banners/banners.component';



@NgModule({
  declarations: [StepperComponent,
    ToolbarComponent, 
    DriverPopoverComponent,
    ProductComponent,
    DateFormatHourPipe,
    BannersComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [StepperComponent, ToolbarComponent, DriverPopoverComponent, ProductComponent, DateFormatHourPipe, BannersComponent]
})
export class CommoncomponentsModule { }
