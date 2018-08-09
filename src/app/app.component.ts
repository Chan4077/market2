import { Settings, Links } from './interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedInjectable } from './shared';
import { NewPostDialog } from './dialogs/newpost.component';
import { Component, OnInit, ViewContainerRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatDialogConfig, MatSnackBar, MatSnackBarRef, MatSidenav } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router, NavigationEnd } from '@angular/router';
import { storage } from 'firebase';
// Dialogs
import { SettingsDialog } from './dialogs/settingsdialog.component';
import { VersionDialog } from './dialogs/versiondialog.component';
import { UrlDialog } from './dialogs/urldialog.component';
// Services
import { SidenavService } from './services/sidenav.service';
import { UrlDialogService } from './services/urldialog.service';
declare let ga: Function;
declare let remixer: any;

@Component({
	selector: 'market2-app',
	templateUrl: './app.component.html',
	providers: [SidenavService]
})

export class AppComponent implements OnInit, AfterViewInit {
	lastSeen: Date = new Date();
	sidenavLinks: Links[];
	isDarkTheme: boolean = false;
	showGreeting: boolean = true;
	showSpinner: boolean;
	settings: Settings;
	timeLoggedIn: number;
	chats: Chat[];
	selectedIndex: number;
	@ViewChild('left') leftSidenav: MatSidenav;
	@ViewChild('right') rightSidenav: MatSidenav;
	constructor(
		private sidenavService: SidenavService,
		private dialog: MatDialog,
		private overlayContainer: OverlayContainer,
		private snackbar: MatSnackBar,
		public router: Router,
		private urlDialogService: UrlDialogService,
		private shared: SharedInjectable,
		private dom: DomSanitizer
	) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				ga('set', 'page', event.urlAfterRedirects);
				ga('send', 'pageview');
			}
		})
	}
    /**
     * Refreshes the current page
     */
	refresh() {
		let dialogRef = this.shared.openConfirmDialog({ msg: this.dom.bypassSecurityTrustHtml('<p>Do you want to refresh the app?</p> <br><p>All unsaved changes will be lost.</p>'), isHtml: true });
		dialogRef.afterClosed().subscribe(result => {
			if (result == 'ok') {
				window.location.reload(true);
			}
		})
	}
    /**
     * Opens the settings dialog
     */
	openSettings() {
		this.dialog.open(SettingsDialog);
	}
	/**
	 * Gets the sidenav mode
	 * @returns {string}
	 */
	getSidenavMode(): string {
		if (this.shared.isMobile()) {
			return "over";
		} else {
			return "side";
		}
	}
    /**
     * Requests the user via a dialog whether to go to a URL
     * @param {string} url The url to go to
     */
	openUrl(url: string) {
		this.urlDialogService.goToUrl(url);
	}
    /**
     * Opens a dialog which shows what dependency versions that the app used
	 * @todo Add actual functionality
	 */
	showVersionInfo() {
		this.dialog.open(VersionDialog);
	}
    /**
     * Gets the links for the sidenav
     */
	getLinks() {
		this.sidenavService.getLinks().then(sidenavLinks => this.sidenavLinks = sidenavLinks);
	}
    /**
	 * Shows a snackbar when the user switches pages
	 * @param {string} name The name of the page that the user switched to
     */
	switchSite(name: string): void {
		this.snackbar.open("Navigated to " + name, null, { duration: 3000, horizontalPosition: "start", panelClass: ["mat-elevation-z2"] });
	}
    /**
	 * Adds an item to the (virtual) Market
     */
	addItem() {
		this.dialog.open(NewPostDialog);
	}
	openRightSidenav(tab: number) {
		this.rightSidenav.open();
		this.selectedIndex = tab;
	}
    /**
     * On init code
     * @version 1.0.2
     * @author Edric Chan
     * @description Init code which is required when `AppComponent` implements `OnInit`
     */
	ngOnInit() {
		this.chats = [
			{ avatar: 'assets/avatars/default-avatar.png', name: 'Lorem ipsum', lastMessage: 'Hey there! Can I lend something from you?', lastSeen: this.lastSeen.toLocaleTimeString(), isUnread: true, unreadCount: 198 },
			{ avatar: 'assets/avatars/default-avatar.png', name: 'Lorem ipsum', lastMessage: 'Hey there! Can I lend something from you?', lastSeen: this.lastSeen.setTime(this.lastSeen.getTime() - 2).toLocaleString(), isUnread: true, unreadCount: 32 },
			{ avatar: 'assets/avatars/default-avatar.png', name: 'Lorem ipsum', lastMessage: 'Hey there! Can I lend something from you?', lastSeen: this.lastSeen.toLocaleTimeString(), isReceived: true },
			{ avatar: 'assets/avatars/default-avatar.png', name: 'Lorem ipsum', lastMessage: 'Hey there! Can I lend something from you?', lastSeen: this.lastSeen.toLocaleTimeString(), isReceivedRead: true }
		]
        /**
		 * Sets the timer
		 * @see Observable#timer
		 * @version 1.0.2
         */
		let timer = Observable.timer(0, 1000);
		// Susbscribe to the timer (t) and set timeloggedin to t
		timer.subscribe(t => this.timeLoggedIn = t);
		// Gets links
		this.getLinks();
		// Sets settings to either parsed JSON of localStorage `settings` or initializes it
		this.settings = <Settings>JSON.parse(localStorage.getItem('settings')) || { 'isDarkTheme': false, 'email': 'johnappleseed@gmail.com', 'name': 'John Appleseed', 'birthday': '2017-03-04', 'showDeveloper': false, 'showGreeting': true };
		// Logs to the console what settings are
		console.log(this.settings);
		// Sets darktheme to settings.isdarktheme
		this.isDarkTheme = this.settings.isDarkTheme;
		// Show 
		this.showGreeting = this.settings.showGreeting;
		console.log(this.isDarkTheme);
		if (this.isDarkTheme) {
			this.overlayContainer.getContainerElement().className = 'dark-theme';
		} else {
			this.overlayContainer.getContainerElement().className = null;
		}
		this.showSpinner = true;
		setTimeout(() => {
			this.showSpinner = false;
			if (this.showGreeting) {
				this.snackbar.open('Signed in as ' + this.settings.email, null, { duration: 3000, horizontalPosition: "start", panelClass: ["mat-elevation-z2"] })
			}
			if (!this.settings) {
				this.openSettings();
			}
		}, 3000);
		// this.subscription = this.fabService.actionStream.subscribe(event => this.events.push(event));

	}
	ngAfterViewInit() {
	}
}
interface Chat {
	avatar: string;
	name: string;
	lastMessage?: string;
	lastSeen?: Date | any;
	isUnread?: boolean;
	unreadCount?: number;
	isReceivedRead?: boolean;
	isReceived?: boolean;
}