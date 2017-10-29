import { DomSanitizer } from '@angular/platform-browser';
import { Shared } from './shared';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
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
	constructor(private marketItemService: MarketItemService, private dialog: MatDialog, private shared: Shared, private dom: DomSanitizer) { }

	getMarketItems() {
		this.marketItemService.getMarketItems().then(marketItems => this.marketItems = marketItems);
	}
	ngOnInit() {
		this.getMarketItems();
	}
	viewAuthor($event: any) {
		let name = JSON.stringify($event);
		let dialogRef = this.dialog.open(MoreInfoDialog);
		dialogRef.componentInstance.json = name;
		// dialogRef.componentInstance.data = author;
	}
	reportAbuse(item) {
		let dialogRef = this.shared.openPromptDialog({ title: "Report Abuse", msg: this.dom.bypassSecurityTrustHtml(`<p>You're reporting an issue for <strong>"${item.name}"</strong> from ${item.user}.</p> <p>What's the issue? Type it in the input field below this text.</p>`), color: "primary", placeholder: "Issue", textarea: true, isHtml: true, disableClose: true });
		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
			if (result == 'cancel') {
				// User cancelled
			} else {
				this.shared.openSnackBar({ msg: "Your issue was sent! Your issue will be reviewed and taken upon action if required.", action: "Undo", additionalOpts: { duration: 7000, horizontalPosition: "start", extraClasses: ["mat-elevation-z2"] } });
			}
		})
	}
	showFewerPosts(user: string) {
		this.shared.openSnackBar({ msg: `Fewer posts will be shown from ${user} and will take effect from the next time you login.`, action: "Undo", additionalOpts: { duration: 7000, horizontalPosition: "start", extraClasses: ["mat-elevation-z2"] } });
	}
	blockUser(user: string) {
		this.shared.openSnackBar({ msg: `${user} was successfully blocked and you will no longer see any posts from ${user}.`, action: "Undo", additionalOpts: { duration: 7000, horizontalPosition: "start", extraClasses: ["mat-elevation-z2"] } });
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
            <h2 matDialogTitle>Reply to {{comment.author}}</h2>
            <mat-dialog-content>
                <mat-list>
                    <mat-list-item>
                        <h4 matLine>{{comment.author}}</h4>
                        <p matLine>{{comment.comment}}</p>
                    </mat-list-item>
                </mat-list>
                <input [(ngModel)]="newCommentReply.id" type="hidden">
                <mat-form-field color="primary">
                    <input matInput [(ngModel)]="newCommentReply.value">
                </mat-form-field>
            </mat-dialog-content>
            <mat-dialog-actions align="end">
                <button mat-button matDialogClose color="primary">Cancel</button>
                <button mat-button (click)="dialogRef.close(newCommentReply)" color="primary">Reply</button>
            </mat-dialog-actions>
            `
})
export class ReplyDialog implements OnInit {
	comment: any;
	item: any;
	newCommentReply: any;
	constructor(public dialogRef: MatDialogRef<ReplyDialog>) { }
	ngOnInit() {
		this.comment = this.dialogRef.componentInstance.comment;
		this.item = this.dialogRef.componentInstance.item;
		this.newCommentReply = { id: this.item.id, value: '', replyTo: '' };
	}
}