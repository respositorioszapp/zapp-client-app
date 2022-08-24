import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportTypePage } from './transport-type.page';

const routes: Routes = [
  {
    path: '',
    component: TransportTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportTypePageRoutingModule {}
