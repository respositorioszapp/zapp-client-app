import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectTypePage } from './select-type.page';

const routes: Routes = [
  {
    path: '',
    component: SelectTypePage,
    children: [
      {
        path: 'client',
        loadChildren: () => import('../signup/signup.module').then(m => m.SignupPageModule),        
      },
      {
        path: 'business',
        loadChildren: () => import('../signup-business/signup-business.module').then(m => m.SignupBusinessPageModule),
      },
      {
        path: '',
        redirectTo: '/select-type/client',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectTypePageRoutingModule {}
