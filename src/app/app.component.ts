import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SidenavService } from './services/sidenav.service';
import { Links } from './sidenav';
import { MdDialog, MdDialogRef, MdDialogConfig, OverlayContainer, MdSnackBar, MdSnackBarRef } from '@angular/material';
import { Router } from '@angular/router';
// Dialogs
import { SettingsDialog } from './dialogs/settingsdialog.component';
import { VersionDialog } from './dialogs/versiondialog.component';
import { UrlDialog } from './dialogs/urldialog.component';
@Component({
    selector: 'app-root',
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
    constructor(private sidenavService: SidenavService, public dialog: MdDialog, public overlayContainer: OverlayContainer, public snackbar: MdSnackBar, private router: Router) {}

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
    /**
     * Goes to specified url.
     * @argument url: the specified url to go to
     * @author Edric Chan
     */
    goToUrl(url: string): void {
        if (this.settings.resetWarnings) {
        let dialogRef = this.dialog.open(UrlDialog);
        dialogRef.componentInstance.url = url;
        dialogRef.afterClosed().subscribe(result => {
            if (result == 'cancel') {
                // Do nothing
                this.snackbar.open('You cancelled the redirect');
            } else if (result == 'redirect') {
                if (this.settings.openNewTab) {
                    console.debug('Opening '+url+' in a new tab.');
                    window.open(
                        url,
                        '_blank'
                    );

                } else {
                    window.location.href = url;
                }
            }
        })
        } else if (this.settings.openNewTab) {
            window.open('Opening '+url+' in a new tab.');
        } else {
            console.debug('Loading: '+url);
            window.location.href = url;
        }
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
    ngOnInit(): void {
        // Starts a timer, counting every second
        let timer = Observable.timer(0, 1000);
        timer.subscribe(t=>this.timeLoggedIn = t);
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
                this.snackbar.open('Signed in as admin@market.com', null, { duration: 2000 })
            }
        }, 2000);
        // this.subscription = this.fabService.actionStream.subscribe(event => this.events.push(event));
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }
}