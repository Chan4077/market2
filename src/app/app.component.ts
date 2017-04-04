import { Component, OnInit, OnDestroy, ViewContainerRef, Inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Links } from './sidenav';
import { MdDialog, MdDialogRef, MdDialogConfig, OverlayContainer, MdSnackBar, MdSnackBarRef } from '@angular/material';
import { Router } from '@angular/router';
import { storage } from 'firebase';
// Dialogs
import { SettingsDialog } from './dialogs/settingsdialog.component';
import { VersionDialog } from './dialogs/versiondialog.component';
import { UrlDialog } from './dialogs/urldialog.component';
// Services
import { SidenavService } from './services/sidenav.service';
import { UrlDialogService } from './services/urldialog.service';
@Component({
    selector: 'market2-app',
    templateUrl: './app.component.html',
    providers: [SidenavService]
})

export class AppComponent implements OnInit, OnDestroy {
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
    constructor(private sidenavService: SidenavService, public dialog: MdDialog, public overlayContainer: OverlayContainer, public snackbar: MdSnackBar, private router: Router, private urlDialogService: UrlDialogService) {
    }
    refresh() {
        window.location.reload(true);
    }
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
            } /* else {
                throw TypeError('result is invalid');
            } */
            //             console.dir(JSON.stringify(result));
            // localStorage.setItem('settings', JSON.stringify(result));
            // console.log("Result: " + result);
            // localStorage.setItem('settings', result);
            // if (result) {
            //     this.overlayContainer.themeClass = 'dark-theme';
            //     localStorage.setItem('darkTheme', JSON.stringify(this.isDarkTheme));
            // } else if (!result) {
            //     this.overlayContainer.themeClass = null;
            //     localStorage.setItem('darkTheme', JSON.stringify(this.isDarkTheme));
            // } else {
            //     // Do nothing
            //     console.log('Cancelled dialog');
            // }
        })
    }
    openUrl(url: string) {
        this.urlDialogService.goToUrl(url);
    }
    showVersionInfo() {
        this.dialog.open(VersionDialog);
    }
    getLinks(): void {
        this.sidenavService.getLinks().then(sidenavLinks => this.sidenavLinks = sidenavLinks);
    }
    switchSite(name: string): void {
        this.snackbar.open("Navigated to " + name, null, { duration: 2000 });
    }
    addItem() {
        console.info('You triggered the new item button!');
    }
    ngOnInit(): void {
        // Starts a timer, counting every second
        let timer = Observable.timer(0, 1000);
        timer.subscribe(t => this.timeLoggedIn = t);
        this.getLinks();
        this.settings = JSON.parse(localStorage.getItem('settings')) || { 'isDarkTheme': false, 'email': 'johnappleseed@gmail.com', 'name': 'John Appleseed', 'birthday': '2017-03-04', 'showDeveloper': false, 'showGreeting': true };
        console.log(this.settings);
        this.isDarkTheme = this.settings.isDarkTheme;
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

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }
}