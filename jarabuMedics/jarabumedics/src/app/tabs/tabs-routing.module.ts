import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:
      [
        {path: 'menu',loadChildren: './menu/menu.module#MenuPageModule'},
        {path: 'home',loadChildren: './home/home.module#HomePageModule'},
        {path: 'contacts',loadChildren: './contacts/contacts.module#ContactsPageModule'},
        {path: '',loadChildren: './tabs/menu.module#MenuPageModule'},
      ]
  },

  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports:
  [
      RouterModule
  ]
})

export class TabsPageRoutingModule {
  
}
