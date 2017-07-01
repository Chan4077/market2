import { Observable } from 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';
import { MdSnackBar, MdSnackBarRef, MdDialog, MdDialogRef } from '@angular/material';
import { Injectable, Component, OnInit } from '@angular/core';

///////////////
// Snackbars //
///////////////
@Component({
	selector: 'warning-snackbar',
	template: '<span style="color:orange"><md-icon svgIcon="alert"></md-icon> Warning: {{warningContent}}</span>'
})
export class WarningSnackbarComponent {
	warningContent: any;
}
@Component({
	selector: 'custom-snackbar',
	template: '<span style="color:white">{{content}}</span>'
})
export class CustomSnackbarComponent {
	content: any;
}
/////////////
// Dialogs //
/////////////
@Component({
	selector: 'alert-dialog',
	template: `
                <h2 md-dialog-title>Alert</h2>
                <md-dialog-content>
                    {{dialogContent}}
                </md-dialog-content>
                <md-dialog-actions align="end">
                    <button md-button color="primary" (click)="dialogRef.close('cancel')">Cancel</button>
                    <button md-button color="primary" (click)="dialogRef.close('ok')">OK</button>
                </md-dialog-actions>
              `
})
export class AlertDialog implements OnInit{
	content: string;
	dialogContent: any;
	align: any;
	constructor(public dialogRef: MdDialogRef<AlertDialog>, private _domSanitizer: DomSanitizer) { }
	ngOnInit() {
		this.dialogContent = this._domSanitizer.bypassSecurityTrustHtml(this.dialogRef.componentInstance.content);
	}
}
@Component({
	selector: 'prompt-dialog',
	template: `
                <h2 md-dialog-title>Prompt</h2>
                <md-dialog-content>
                    {{question}}
					<md-input-container color="primary">
						<input mdInput [(ngModel)]="input">
					</md-input-container>
                </md-dialog-content>
                <md-dialog-actions [attr.align]="align">
                    <button md-button color="primary" md-dialog-close>Cancel</button>
                    <button md-button color="primary" (click)="dialogRef.close(input)">Submit</button>
                </md-dialog-actions>
              `
})
export class PromptDialog {
	question: string;
	align: any;
	input: any;
	constructor(public dialogRef: MdDialogRef<PromptDialog>) { }
}
@Component({
    selector: 'custom-dialog',
    template: `
                <h2 md-dialog-title>{{dialogTitle}}</h2>
                <md-dialog-content>
                    {{customContent}}
                </md-dialog-content>
                <md-dialog-actions [align]="align">
                    <button md-button [color]="cancelColor" (click)="dialogRef.close('cancel')">{{cancelBtnLabel}}</button>
                    <button md-button [color]="okColor" (click)="dialogRef.close('ok')">{{okBtnLabel}}</button>
                </md-dialog-actions>
              `
})
export class CustomDialog {
    dialogTitle: string = "Custom Dialog";
    customContent: any|string;
    align: string = "end";
    cancelColor: string;
    okColor: string;
    cancelBtnLabel: string;
    okBtnLabel: string;
    constructor(public dialogRef: MdDialogRef<CustomDialog>){}
}
///////////////////////////////////////////////////////////////
@Injectable()
/**
 * The shared service
 */
export class SharedService {
	constructor(private _snackbar: MdSnackBar, private _domSanitizer: DomSanitizer, private _dialog: MdDialog) { }
    /**
     * The snackbar content
     * @private
     */
	snackbarContent: any;
	/**
	 * Debugging
	 * @private
	 * @todo Change this when on production build via `ng build --prod`
	 */
	debugConsole: false;
    /**
     * Detects if mobile
     * @return boolean
     * @see navigator.userAgent
     */
	public detectIsMobile(): boolean {
		if (navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
		) {
			return true;
		} else {
			return false;
		}
	}
    /**
     * Shows a custom snackbar.
     * @param {string} snackbarContent The content for the snackbar
     * @param {boolean} isHtml Whether the content is HTML
     * @param {string} duration The duration of which to show the snackbar
     */
	public showCustomSnackbar(snackbarContent: string, isHtml: boolean, duration: number) {
		if (isHtml) {
			this.snackbarContent = this._domSanitizer.bypassSecurityTrustHtml(snackbarContent);
		} else {
			this.snackbarContent = snackbarContent;
		}
		let snackbarRef = this._snackbar.openFromComponent(CustomSnackbarComponent, { duration: duration })
		snackbarRef.instance.content = this.snackbarContent;
	}
    /**
     * Shows a warning snackbar.
     * @param {string} snackbarContent The content for the snackbar
     * @param {string} duration The duration of which to show the snackbar
     */
	public showWarningSnackbar(snackbarContent: string, duration: number) {
		let snackbarRef = this._snackbar.openFromComponent(WarningSnackbarComponent, { duration: duration })
		snackbarRef.instance.warningContent = snackbarContent;
	}
    /**
     * Shows an alert dialog.
     * @param content The content of the dialog
     * @param align Align direction for dialog action buttons
	 * @version 1.2.3
	 * @example <caption>Getting a value from the result of the dialog</caption>
	 * let dialog = this.sharedService.showAlertDialog('Test', 'start');
	 * dialog.subscribe(result => {
	 * 		if (result == 'ok') {
	 * 			console.log('Yay');
	 * 		} else {
	 * 		// Do nothing
	 * 		}
	 * })
	 * 
     * @returns {string} A result for the dialog close
     */
	public showAlertDialog(content: string, align: string = "end"): Observable<any> {
		content = content.replace("\n", "<br>")
		let dialogRef = this._dialog.open(AlertDialog);
		dialogRef.componentInstance.align = align;
		dialogRef.componentInstance.content = content;
		return dialogRef.afterClosed();
	}
	public showPromptDialog(question: string, input: any, align: string = "end", ): string {
		let dialogRef = this._dialog.open(PromptDialog);
		dialogRef.componentInstance.question = question;

		return input;
	}
    /**
     * @description Shows a custom dialog with lots of params
     * @param {string} dialogTitle The dialog title
     * @param {string} customContent The content of the dialog
     * @param {string} cancelColor The color of the cancel button
     * @param {string} okColor The color of the ok button
     * @param {string} cancelBtnLabel The label of the cancel button
     * @param {string} okBtnLabel The label of the ok button
     * @param {string} align The align of the actions
     * @todo Make this shorter
     * @see CustomDialog
     * @version 1.3
     */
    public showCustomDialog(dialogTitle: string, customContent: string, cancelColor: string = "warn", okColor: string = "primary", cancelBtnLabel: string, okBtnLabel: string, align: string = "end"): Observable<any> {
        let dialogRef = this._dialog.open(CustomDialog);
        dialogRef.componentInstance.align = align;
        dialogRef.componentInstance.cancelBtnLabel = cancelBtnLabel;
        dialogRef.componentInstance.cancelColor = cancelColor;
        dialogRef.componentInstance.customContent = customContent;
        dialogRef.componentInstance.dialogTitle = dialogTitle;
        dialogRef.componentInstance.okBtnLabel = okBtnLabel;
        dialogRef.componentInstance.okColor = okColor;
        return dialogRef.afterClosed();
    }
}