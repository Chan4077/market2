import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { MarketComponent, NewestMarketSortComponent, PopularMarketSortComponent } from './market.component';
import { AccountComponent } from './account.component';
// Routes
export const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'market', children: [
    {
      path: '',
      component: MarketComponent
    },
    {
      path: 'sort',
      children: [
        {
          path: 'newest',
          component: NewestMarketSortComponent
        },
        {
          path: 'popular',
          component: PopularMarketSortComponent
        }
      ]
    }
  ]},
  { path: 'account', component: AccountComponent},
  { path: '', redirectTo: '/market', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);