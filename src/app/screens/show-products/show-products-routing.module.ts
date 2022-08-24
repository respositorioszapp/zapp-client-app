import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowProductsPage } from './show-products.page';

const routes: Routes = [
  {
    path: '',
    component: ShowProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowProductsPageRoutingModule {}
