import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivateLocationPage } from './activate-location.page';

const routes: Routes = [
  {
    path: '',
    component: ActivateLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivateLocationPageRoutingModule {}
