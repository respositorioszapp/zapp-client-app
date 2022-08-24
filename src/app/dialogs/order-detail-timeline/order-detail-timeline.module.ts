import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailTimelinePageRoutingModule } from './order-detail-timeline-routing.module';

import { OrderDetailTimelinePage } from './order-detail-timeline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailTimelinePageRoutingModule
  ],
  declarations: [OrderDetailTimelinePage]
})
export class OrderDetailTimelinePageModule {}
