import { Component, OnInit, ViewContainerRef, Inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Links } from './sidenav';
import { MdDialog, MdDialogRef, MdDialogConfig, OverlayContainer, MdSnackBar, MdSnackBarRef } from '@angular/material';
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

@Component({
    selector: 'market2-app',
    templateUrl: './app.component.html',
    providers: [SidenavService]
})

export class AppComponent implements OnInit {
    sidenavLinks: Links[];
    isDarkTheme: boolean = false;
    showGreeting: boolean = true;
    showSpinner: boolean;
    settings: any;
    timeLoggedIn: number;
    // result: any;
    // overlayContainer.themeClass = 'dark-theme';
    // private events: string[] = [];
    // private subscription: Subscription;
    @ViewChild('left') public leftSidenav;
    constructor(private sidenavService: SidenavService, public dialog: MdDialog, public overlayContainer: OverlayContainer, public snackbar: MdSnackBar, public router: Router, private urlDialogService: UrlDialogService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        })
    }
    /**
     * Refreshes the page
     * @version 1.0.2
     * @author Edric Chan
     * @example `<button md-button (click)="refresh()">Refresh</button>`
     * @description Uses `window.locatiob.reload(true)`, where passing in `true` will force-reload
     */
    refresh() {
        window.location.reload(true);
    }
    /**
     * Opens the `SettingsDialog`
     * @version 1.0.2
     * @author Edric Chan
     * @example `<button md-button (click)="openSettings()">Open Settings</button>` 
     * @description Opens a dialog which is imported from `./dialogs/settingsdialog.component` and opened in `this.dialog.open()`
     */
    openSettings() {
        let dialogRef = this.dialog.open(SettingsDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result instanceof Array || result instanceof Object) {
                console.dir(JSON.stringify(result));
                localStorage.setItem('settings', JSON.stringify(result));
                console.log('User clicked save. Saving settings to localStorage...');
                this.snackbar.open('Preferences saved.', 'Undo', { duration: 5000 });
            } else if (result == 'cancel') {
                // Sets localStorage settings to value on `ngOnInit()`
                localStorage.setItem('settings', JSON.stringify(this.settings));
                console.log('User clicked cancel. Reverting to initial settings in localStorage.');
                this.snackbar.open('Settings were reverted', null, { duration: 5000 });
            } else if (result == 'clear') {
                // Do nothing
                console.log('Settings cleared!');
            }
        })
    }
    /**
     * Goes to the url specified
     * @version 1.0.2
     * @author Edric Chan
     * @example `<button md-button (click)="openUrl('https://example.com')">Go to url</button>`
     * @description Opens a url via a dialog which states that the he/she is being redirected to another website
     * @param {url:string} The url to redirect to 
     */
    openUrl(url: string) {
        this.urlDialogService.goToUrl(url);
    }
    /**
     * Shows the versions used
     * @version 1.0.2
     * @author Edric Chan
     * @example `<button md-button (click)="showVersionInfo()">Versions used</button>`
     * @description Opens a dialog which shows more info about the versions used
     */
    showVersionInfo() {
        this.dialog.open(VersionDialog);
    }
    /**
     * Get links for sidenav
     * @version 1.0.2
     * @author Edric Chan
     * @example `ngOnInit() {this.getLinks();}`
     * @description Gets the links for sidenav via a service
     * @returns null
     */
    getLinks(): void {
        this.sidenavService.getLinks().then(sidenavLinks => this.sidenavLinks = sidenavLinks);
    }
    /**
     * Snackbar for stating where the user navigated to
     * @version 1.0.2
     * @author Edric Chan
     * @example `<md-list-item (click)="switchSite(links.text)">Some text</md-list-item>`
     * @description Opens a sidenav when on click to navigate
     * @param {name:string} The name of the site being navigated to 
     * @returns null
     */
    switchSite(name: string): void {
        this.snackbar.open("Navigated to " + name, null, { duration: 2000 });
    }
    /**
     * @version 1.0.2
     * @author Edric Chan
     * @example `<button md-fab (click)="addItem()"></button>`
     * @description Just logs to the console...
     */
    addItem() {
        console.info('You triggered the new item button!');
    }
    /**
     * On init code
     * @version 1.0.2
     * @author Edric Chan
     * @description Init code which is required when `AppComponent` implements `OnInit`
     */
    ngOnInit(): void {
        // Starts a timer, counting every second
        let timer = Observable.timer(0, 1000);
        // Susbscribe to the timer (t) and set timeloggedin to t
        timer.subscribe(t => this.timeLoggedIn = t);
        // Gets links
        this.getLinks();
        // Sets settings to either parsed JSON of localStorage `settings` or initializes it
        this.settings = JSON.parse(localStorage.getItem('settings')) || { 'isDarkTheme': false, 'email': 'johnappleseed@gmail.com', 'name': 'John Appleseed', 'birthday': '2017-03-04', 'showDeveloper': false, 'showGreeting': true };
        // Logs to the console what settings are
        console.log(this.settings);
        // Sets darktheme to settings.isdarktheme
        this.isDarkTheme = this.settings.isDarkTheme;
        // Show 
        this.showGreeting = this.settings.showGreeting;
        console.log(this.isDarkTheme);
        if (this.isDarkTheme) {
            this.overlayContainer.themeClass = 'dark-theme';
        } else {
            this.overlayContainer.themeClass = null;
        }
        this.showSpinner = true;
        setTimeout(() => {
            this.showSpinner = false;
            if (this.showGreeting) {
                this.snackbar.open('Signed in as '+this.settings.email, null, { duration: 2000 })
            }
        }, 2000);
        // this.subscription = this.fabService.actionStream.subscribe(event => this.events.push(event));
        
    }
}