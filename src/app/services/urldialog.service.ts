import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// UrlDialog
import { UrlDialog } from '../dialogs/urldialog.component';
@Injectable()
export class UrlDialogService {
    settings: any = JSON.parse(localStorage.getItem('settings')) || {};
    constructor(private snackbar: MatSnackBar, private dialog: MatDialog) { }
    /**
     * Opens a dialog which asks the user whether to allow the app to redirect user to Uthe specified URL
     * @param {string} url The url to go to
     */
    public goToUrl(url: string) {
        if (this.settings.resetWarnings) {
            let dialogRef = this.dialog.open(UrlDialog);
            dialogRef.componentInstance.url = url;
            dialogRef.afterClosed().subscribe(result => {
                if (result == 'cancel') {
                    // Do nothing
                    this.snackbar.open('Redirect was cancelled', null, { duration: 5000, horizontalPosition: "start", extraClasses: ["mat-elevation-z2"] });
                } else if (result == 'redirect') {
                    if (this.settings.openNewTab) {
                        console.debug('Opening ' + url + ' in a new tab.');
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
            window.open(
                url,
                '_blank'
            )
            console.debug('Opening ' + url + ' in a new tab.');
        } else {
            console.debug('Loading: ' + url);
            window.location.href = url;
        }
    }
}