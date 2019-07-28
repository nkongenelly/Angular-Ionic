import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OtherRegistrtaionPage } from './other-registrtaion.page';

const routes: Routes = [
  {
    path: '',
    component: OtherRegistrtaionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OtherRegistrtaionPage]
})
export class OtherRegistrtaionPageModule {}
