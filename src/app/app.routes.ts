import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'dish-detail/:id',
    loadComponent: () => import('./pages/dish-detail/dish-detail.page').then(m => m.DishDetailPage)
  },
];
