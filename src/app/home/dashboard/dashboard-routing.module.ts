import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'recipient',
    loadChildren: () => import('./hodler/recipient/recipient.module').then(m => m.RecipientPageModule)
  },
  {
    path: 'donate',
    loadChildren: () => import('./hodler/donate/donate.module').then(m => m.DonatePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./hodler/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
