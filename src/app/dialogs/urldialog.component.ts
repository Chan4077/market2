import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'url-dialog',
    templateUrl: './urldialog.component.html'
})

export class UrlDialog implements OnInit {
    settings: any;
    isDarkTheme: boolean;
    url: string;
    dontShowAgain: boolean;
    constructor(public dialogRef: MatDialogRef<UrlDialog>) {}

    ngOnInit() {
        this.settings = JSON.parse(localStorage.getItem('settings')) || { 'isDarkTheme': true, 'name': 'Lorem ipsum', 'email': 'johnappleseed@gmail.com', 'birthday': '2003-12-23', 'showDeveloper': false };
        this.isDarkTheme = this.settings.isDarkTheme;
        this.dontShowAgain = !this.settings.resetWarnings;
        this.url = this.dialogRef.componentInstance.url;
    }
}