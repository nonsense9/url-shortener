import { Routes } from '@angular/router';
import { Link } from './pages/link/link';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'link',
    component: Link
  }
];
