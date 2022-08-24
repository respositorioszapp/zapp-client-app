import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DummyCreateOrderPage } from './dummy-create-order.page';

const routes: Routes = [
  {
    path: '',
    component: DummyCreateOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DummyCreateOrderPageRoutingModule {}
