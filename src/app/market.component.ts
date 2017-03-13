import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
// Marketitem service
import { MarketItemService } from './services/marketitem.service';
import { Item } from './marketitems';
import { ViewAuthorDialog } from './dialogs/viewauthor.component';
@Component({
    selector: 'market',
    templateUrl: './market.component.html'
})
export class MarketComponent implements OnInit {
    marketItems: Item[];
    comments: any;
    constructor(private marketItemService: MarketItemService, public dialog: MdDialog) { }

    getMarketItems(): void {
        this.marketItemService.getLinks().then(marketItems => this.marketItems = marketItems);
    }
    ngOnInit(): void {
        this.getMarketItems();
    }
    viewAuthor($event: any): void {
        let name = JSON.stringify($event);
        // let config = new MdDialogConfig();
        let dialogRef = this.dialog.open(ViewAuthorDialog);
        dialogRef.componentInstance.name = name;
        // dialogRef.componentInstance.data = author;
    }
    addItem(): void {
        console.log('You clicked the plus button!');
    }
    showComment($event: any): void {
        // this.comments = $event;
    }
}