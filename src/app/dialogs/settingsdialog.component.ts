import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
@Component({
  selector: 'settings-dialog',
  templateUrl: './settingsdialog.component.html'
})

export class SettingsDialog implements OnInit {
  isDarkTheme: boolean;
  // email: string;
  settings: any;
  constructor(public dialogRef: MdDialogRef<SettingsDialog>) {}

  clearSettings(): void {
    if (confirm('Are you sure you want to clear settings? This cannot be undone!')) {
    console.log('Clearing...');
    localStorage.removeItem('settings');
    } else {
      console.log('User cancelled');
    }
  }
  ngOnInit(): void {
    this.settings = JSON.parse(localStorage.getItem('settings')) || {'isDarkTheme': true, 'name': 'Lorem ipsum', 'email': 'johnappleseed@gmail.com', 'birthday': '2003-12-23', 'showDeveloper': false};
    this.isDarkTheme = this.settings.isDarkTheme;
  }
}