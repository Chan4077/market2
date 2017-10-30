import { Settings } from './../settings';
import { Shared } from '../shared';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
	selector: 'settings-dialog',
	templateUrl: './settingsdialog.component.html'
})

export class SettingsDialog implements OnInit {
	isDarkTheme: boolean;
	// email: string;
	settings: any;
	constructor(private dialogRef: MatDialogRef<SettingsDialog>, private shared: Shared) { }
	emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
	get isMobile() {
		if (this.shared.isMobile()) {
			return true;
		} else {
			return false;
		}
	}
	clearSettings() {
		if (confirm('Are you sure you want to clear settings? This cannot be undone!')) {
			console.log('Clearing...');
			localStorage.removeItem('settings');
		} else {
			console.log('User cancelled');
		}
	}
	ngOnInit() {
		this.settings = <Settings> JSON.parse(localStorage.getItem('settings')) || { 'isDarkTheme': true, 'name': 'Lorem ipsum', 'email': 'johnappleseed@gmail.com', 'birthday': '2003-12-23', 'showDeveloper': false };
		this.isDarkTheme = this.settings.isDarkTheme;
	}
	/**
	 * Closes the dialog
	 */
	closeDialog() {
		this.dialogRef.close();
	}
	cancel() {
		this.closeDialog();
		// Sets localStorage settings to value on `ngOnInit()`
		localStorage.setItem('settings', JSON.stringify(this.settings));
		console.log('User clicked cancel. Reverting to initial settings in localStorage.');
		this.shared.openSnackBar({ msg: 'Settings were reverted', additionalOpts: { duration: 5000, horizontalPosition: "start", extraClasses: ["mat-elevation-z2"] } });
	}
	save() {
		this.closeDialog();
		localStorage.setItem('settings', JSON.stringify(this.settings));
		console.log('User clicked save. Saving settings to localStorage...');
		let snackBarRef = this.shared.openSnackBarWithRef({ msg: 'Preferences saved.', action: 'Reload', additionalOpts: { duration: 5000, horizontalPosition: "start", extraClasses: ["mat-elevation-z2"] } });
		snackBarRef.onAction().subscribe(_ => {
			window.location.reload(true);
		})
	}
}