import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account-component',
  templateUrl: './account.component.html'
})

export class AccountComponent implements OnInit {
    account: any;

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