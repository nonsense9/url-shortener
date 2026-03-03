import { Routes } from '@angular/router';
import { Link } from './pages/link/link';
import { Home } from './pages/home/home';
import { Layout } from './components/layout/layout';
import { LinkDetail } from './pages/link/id/link-detail';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'link',
        component: Link
      },
      {
        path: 'link/:id',
        component: LinkDetail
      }
    ]
  },

];
