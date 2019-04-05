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
  { path: 'add-savings', loadChildren: './add-savings/add-savings.module#AddSavingsPageModule' },
  { path: 'add-offering', loadChildren: './add-offering/add-offering.module#AddOfferingPageModule' },
  { path: 'edit-savings', loadChildren: './edit-savings/edit-savings.module#EditSavingsPageModule' },
  { path: 'add-income', loadChildren: './add-income/add-income.module#AddIncomePageModule' },
  { path: 'add-projects', loadChildren: './add-projects/add-projects.module#AddProjectsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
