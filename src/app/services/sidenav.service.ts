import { Injectable } from '@angular/core';

import { Links } from '../interfaces';
import { LINKS } from '../data/sidenav-data';
@Injectable()
export class SidenavService {
	getLinks(): Promise<Links[]> {
		return Promise.resolve(LINKS);
	}
}