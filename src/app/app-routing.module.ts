import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./home/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard/:id',
    loadChildren: () => import('./home/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
{
  path: 'loging',
    loadChildren: () => import('./home/loging/loging.module').then(m => m.LogingPageModule)
},
{
  path: 'about-us',
    loadChildren: () => import('./home/about-us/about-us.module').then(m => m.AboutUsPageModule)
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
