import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from "@angular/material/core";

@Component({
	selector: 'account-component',
	templateUrl: './account.component.html'
})

export class AccountComponent implements OnInit {
	account: any;
	email = new FormControl('', [Validators.required, Validators.email]);
	getEmailErrorMsg(): string {
		if (this.email.hasError('required')) {
			return 'A value is required.';
		} else if (this.email.hasError('email')) {
			return 'A valid email must be entered.';
		} else {
			return '';
		}
	}
	customErrorStateMatcher: ErrorStateMatcher = {
		isErrorState: (control: FormControl | null) => {
			if (control) {
				const hasInteraction = control.dirty || control.touched;
				const isInvalid = control.invalid;

				return !!(hasInteraction && isInvalid);
			}

			return false;
		}
	};
	ngOnInit() {
		this.account = {
			name: 'John Lim',
			birth: new Date(),
			email: 'johnlim@market2.com',
			about: 'I\'m part of the market2 staff. In fact, I was the one who started it!',
			isVerifiedEmail: true,
			isVerified: true,
			isStaff: true
		}
	}
}