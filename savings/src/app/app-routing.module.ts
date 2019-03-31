import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'savings', loadChildren: './savings/savings.module#SavingsPageModule' },
  { path: 'income', loadChildren: './income/income.module#IncomePageModule' },
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsPageModule' },
  { path: 'monthly', loadChildren: './monthly/monthly.module#MonthlyPageModule' },
  { path: 'offering', loadChildren: './offering/offering.module#OfferingPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
