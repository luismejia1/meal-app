import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home/?id',
    pathMatch: 'full',
  },
  {
    path: 'dish-detail/:id',
    loadComponent: () => import('./pages/dish-detail/dish-detail.page').then(m => m.DishDetailPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.page').then( m => m.HistoryPage)
  },
];
