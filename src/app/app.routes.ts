import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { MarketComponent } from './market.component';
import { AccountComponent } from './account.component';
// Routes
export const routes: Routes = [
  { path: 'about', component: AboutComponent },
  // { path: '**', component: PageNotFoundComponent },
  { path: 'market', component: MarketComponent},
  { path: 'account', component: AccountComponent},
  { path: '', redirectTo: '/market', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);