import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// App components
import { AboutComponent } from './about.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { MarketComponent, NewestMarketSortComponent, PopularMarketSortComponent } from './market.component';
import { AccountComponent } from './account.component';
import { NewPostComponent } from './new.component';
/**
 * Routes used for routing the app
 * @version 1.0.2
 * @author Edric Chan
 * @example In your `app.module.ts`, import `routing` into `imports` in `NgModule`
 * @description Paths to route to with components
 * @type Routes[]
 */
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
  { path: 'new', component: NewPostComponent},
  { path: '', redirectTo: '/market', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);