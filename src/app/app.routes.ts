import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'trainer',
    loadComponent: () => import('./pages/trainer/trainer.component').then(m => m.TrainerComponent),
    canActivate: [authGuard]
  },
  {
    path: 'athlete',
    loadComponent: () => import('./pages/athlete/athlete.component').then(m => m.AthleteComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'available', pathMatch: 'full' },
      { 
        path: 'available',
        loadComponent: () => import('./pages/athlete/available-groups/available-groups.component').then(m => m.AvailableGroupsComponent)
      },
      {
        path: 'subscribed',
        loadComponent: () => import('./pages/athlete/subscribed-groups/subscribed-groups.component').then(m => m.SubscribedGroupsComponent)
      }
    ]
  }
];