import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltersSearchPageRoutingModule } from './filters-search-routing.module';

import { FiltersSearchPage } from './filters-search.page';
import { CommoncomponentsModule } from 'src/app/modules/commoncomponents/commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltersSearchPageRoutingModule,
    CommoncomponentsModule
  ],
  declarations: [FiltersSearchPage]
})
export class FiltersSearchPageModule {}
