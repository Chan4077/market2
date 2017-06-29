import { SharedService } from './../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
    selector: 'settings-dialog',
    templateUrl: './settingsdialog.component.html'
})

export class SettingsDialog implements OnInit {
    isDarkTheme: boolean;
    isMobile: boolean;
    // email: string;
    settings: any;
    constructor(public dialogRef: MdDialogRef<SettingsDialog>, private sharedService: SharedService) { }
    emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
    clearSettings(): void {
        if (confirm('Are you sure you want to clear settings? This cannot be undone!')) {
            console.log('Clearing...');
            localStorage.removeItem('settings');
        } else {
            console.log('User cancelled');
        }
    }
    ngOnInit(): void {
        this.settings = JSON.parse(localStorage.getItem('settings')) || { 'isDarkTheme': true, 'name': 'Lorem ipsum', 'email': 'johnappleseed@gmail.com', 'birthday': '2003-12-23', 'showDeveloper': false };
        this.isDarkTheme = this.settings.isDarkTheme;
        this.isMobile = this.sharedService.detectIsMobile();
    }
}