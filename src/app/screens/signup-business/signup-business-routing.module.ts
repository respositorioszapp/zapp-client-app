import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupBusinessPage } from './signup-business.page';

const routes: Routes = [
  {
    path: '',
    component: SignupBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupBusinessPageRoutingModule {}
