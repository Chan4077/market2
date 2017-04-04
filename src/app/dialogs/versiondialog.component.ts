import { Component, OnInit } from '@angular/core';
import { UrlDialogService } from '../services/urldialog.service';
@Component({
    selector: 'version-dialog',
    templateUrl: './versiondialog.component.html'
})

export class VersionDialog implements OnInit {
    siteVersion: string;
    dependencies: any;
    settings: any;
    isDarkTheme: boolean;
    constructor(private urlDialogService: UrlDialogService) {}

    ngOnInit() {
        this.siteVersion = "1.0.1";
        // TODO: Add depedencies
        this.dependencies = {};
        this.settings = JSON.parse(localStorage.getItem('settings')) || { 'isDarkTheme': true, 'name': 'Lorem ipsum', 'email': 'johnappleseed@gmail.com', 'birthday': '2003-12-23', 'showDeveloper': false };
        this.isDarkTheme = this.settings.isDarkTheme;
    }
    openUrl(url: string) {
        this.urlDialogService.goToUrl(url);
    }
}