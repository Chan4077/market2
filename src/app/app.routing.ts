import { TestpageComponent } from './testpage/testpage.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// App components
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MarketComponent, NewestMarketSortComponent, PopularMarketSortComponent } from './market/market.component';
import { AccountComponent } from './account/account.component';
/**
 * Routes used for routing the app
 */
export const routes: Routes = [
	{ path: 'about', component: AboutComponent },
	{
		path: 'market', component: MarketComponent, children: [
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
		]
	},
	{ path: 'account', component: AccountComponent },
	{ path: 'test', component: TestpageComponent },
	{ path: '', redirectTo: '/market', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);