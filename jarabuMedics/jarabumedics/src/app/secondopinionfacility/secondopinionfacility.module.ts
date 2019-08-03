import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SecondopinionfacilityPage } from './secondopinionfacility.page';

const routes: Routes = [
  {
    path: '',
    component: SecondopinionfacilityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SecondopinionfacilityPage]
})
export class SecondopinionfacilityPageModule {}
