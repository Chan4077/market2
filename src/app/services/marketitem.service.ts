import { Injectable } from '@angular/core';

import { Item } from '../interfaces';
import { ITEMS } from '../data/marketitems-data';

// import { AngularFire } from 'angularfire2';

@Injectable()
export class MarketItemService {
	// constructor(private af: AngularFire){}
	getMarketItems(): Promise<Item[]> {
		return Promise.resolve(ITEMS);
	}
}