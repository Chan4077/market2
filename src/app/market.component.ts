import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
// Marketitem service
import { MarketItemService } from './services/marketitem.service';
import { Item } from './marketitems';
import { MoreInfoDialog } from './dialogs/moreinfo.component';
// Angularfire2
// import { AngularFire } from 'angularfire2';
@Component({
    selector: 'market-sort-nav',
    templateUrl: './market-sort-nav.component.html'
})
export class MarketNavComponent {
    sortLinks = [
        { label: 'Newest', link: 'sort/newest' },
        { label: 'Popular', link: 'sort/popular' },
        { label: 'Starred', link: 'sort/starred' }
    ]
}
@Component({
    selector: 'market',
    templateUrl: './market.component.html'
})
export class MarketComponent implements OnInit {
    marketItems: Item[];
    comments: any;
    constructor(private marketItemService: MarketItemService, public dialog: MdDialog/*, private af: AngularFire*/) { }

    getMarketItems(): void {
        this.marketItemService.getMarketItems().then(marketItems => this.marketItems = marketItems);
    }
    ngOnInit(): void {
        this.getMarketItems();
    }
    viewAuthor($event: any): void {
        let name = JSON.stringify($event);
        // let config = new MdDialogConfig();
        let dialogRef = this.dialog.open(MoreInfoDialog);
        dialogRef.componentInstance.json = name;
        // dialogRef.componentInstance.data = author;
    }
    addItem(): void {
        console.log('You clicked the plus button!');
    }
    showComment($event: any): void {
        // this.comments = $event;
    }
}
@Component({
    selector: 'sort-popular-market',
    templateUrl: './market-sort/popularsort.component.html'
})
export class PopularMarketSortComponent { }

@Component({
    selector: 'sort-newest-market',
    templateUrl: './market-sort/newestsort.component.html'
})
export class NewestMarketSortComponent { }