import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
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
    newCommentHidden: any = [];
    commentHidden: any = [];
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
    showNewComment(index: any, showOrHide?: boolean) {
        if (showOrHide) {
            if (showOrHide) {
                this.newCommentHidden[index] = true;
            } else {
                this.newCommentHidden[index] = false;
            }
        } else {
            if (this.newCommentHidden[index]) {
                this.newCommentHidden[index] = false;
            } else {
                this.newCommentHidden[index] = true;
            }
        }
    }
    showComment(index: any) {
        if (this.commentHidden[index]) {
            this.commentHidden[index] = false;
        } else {
            this.commentHidden[index] = true;
        }
    }
    reply(comment: any, item: any) {
        let dialogRef = this.dialog.open(ReplyDialog);
        dialogRef.componentInstance.comment = comment;
        dialogRef.componentInstance.item = item;
        dialogRef.afterClosed().subscribe(result => {
            /** @todo Update this */
            console.log(result);
        })
    }
    newCommentIsHidden(index: any) {
        if (this.newCommentHidden[index]) {
            return true;
        } else {
            return false;
        }
    }
    commentIsHidden(index: any) {
        if (this.commentHidden[index]) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Posts a comment
     * @version 1.2.2
     * @param {string} comment The comment to post
     */
    postComment(comment: string) {
        console.log(comment);
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

@Component({
    selector: 'reply-dialog',
    template: `
            <h2 md-dialog-title>Reply to {{comment.author}}</h2>
            <md-dialog-content>
                <md-list>
                    <md-list-item>
                        <h4 md-line>{{comment.author}}</h4>
                        <p md-line>{{comment.comment}}</p>
                    </md-list-item>
                </md-list>
                <input [(ngModel)]="newCommentReply.id" type="hidden">
                <md-input-container color="primary">
                    <input mdInput [(ngModel)]="newCommentReply.value">
                </md-input-container>
            </md-dialog-content>
            <md-dialog-actions align="end">
                <button md-button md-dialog-close color="primary">Cancel</button>
                <button md-button (click)="dialogRef.close(newCommentReply)" color="primary">Reply</button>
            </md-dialog-actions>
            `
})
export class ReplyDialog implements OnInit{
    comment: any;
    item: any;
    newCommentReply: any;
    constructor(public dialogRef: MdDialogRef<ReplyDialog>) {}
    ngOnInit(){
        this.comment = this.dialogRef.componentInstance.comment;
        this.item = this.dialogRef.componentInstance.item;
        this.newCommentReply = {id: this.item.id, value: '', replyTo: ''};
    }
}