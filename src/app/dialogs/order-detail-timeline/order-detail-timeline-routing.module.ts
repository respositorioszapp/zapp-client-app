import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDetailTimelinePage } from './order-detail-timeline.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailTimelinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailTimelinePageRoutingModule {}
