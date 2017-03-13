import { Injectable } from '@angular/core';

import { Item } from '../marketitems';
import { ITEMS } from '../data/marketitems-data';

@Injectable()
export class MarketItemService {
  getLinks(): Promise<Item[]> {
    return Promise.resolve(ITEMS);
  }
}