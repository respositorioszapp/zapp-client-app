import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LittleAlertPage } from './little-alert.page';

const routes: Routes = [
  {
    path: '',
    component: LittleAlertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LittleAlertPageRoutingModule {}
