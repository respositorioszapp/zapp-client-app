import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectClientCityPage } from './select-client-city.page';

const routes: Routes = [
  {
    path: '',
    component: SelectClientCityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectClientCityPageRoutingModule {}
