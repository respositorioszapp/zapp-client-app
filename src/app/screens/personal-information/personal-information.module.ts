import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalInformationPageRoutingModule } from './personal-information-routing.module';

import { PersonalInformationPage } from './personal-information.page';
import { CommoncomponentsModule } from 'src/app/modules/commoncomponents/commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PersonalInformationPageRoutingModule
  ],
  declarations: [PersonalInformationPage]
})

export class PersonalInformationPageModule {}
