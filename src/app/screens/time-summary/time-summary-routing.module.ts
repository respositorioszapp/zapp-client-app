import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeSummaryPage } from './time-summary.page';

const routes: Routes = [
  {
    path: '',
    component: TimeSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeSummaryPageRoutingModule {}
