import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltersSearchPage } from './filters-search.page';

const routes: Routes = [
  {
    path: '',
    component: FiltersSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltersSearchPageRoutingModule {}
