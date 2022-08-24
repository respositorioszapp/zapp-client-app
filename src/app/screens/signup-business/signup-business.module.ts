import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupBusinessPageRoutingModule } from './signup-business-routing.module';

import { SignupBusinessPage } from './signup-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignupBusinessPageRoutingModule
  ],
  declarations: [SignupBusinessPage]
})
export class SignupBusinessPageModule {}
