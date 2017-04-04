import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MdSnackBar, MdDialog } from '@angular/material';

// UrlDialog
import { UrlDialog } from '../dialogs/urldialog.component';
@Injectable()
export class UrlDialogService {
    settings: any = JSON.parse(localStorage.getItem('settings')) || {};
    constructor(private snackbar: MdSnackBar, private dialog: MdDialog) { }
    public goToUrl(url: string): void {
        if (this.settings.resetWarnings) {
            let dialogRef = this.dialog.open(UrlDialog);
            dialogRef.componentInstance.url = url;
            dialogRef.afterClosed().subscribe(result => {
                if (result == 'cancel') {
                    // Do nothing
                    this.snackbar.open('You cancelled the redirect', null, { duration: 5000 });
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