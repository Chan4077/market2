import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'version-dialog',
    templateUrl: './versiondialog.component.html'
})

export class VersionDialog implements OnInit {
    siteVersion: string;
    dependencyVersions: any;

    ngOnInit() {
        this.siteVersion = "1.0.0";
        // TODO: Add dependencyVersions
        this.dependencyVersions = {};
    }
}