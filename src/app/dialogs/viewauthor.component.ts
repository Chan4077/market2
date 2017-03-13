import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
@Component({
  selector: 'view-author-dialog',
  templateUrl: './viewauthor.component.html'
})

export class ViewAuthorDialog implements OnInit {
  author: any;
  name: string;
  settings: any;
  isDarkTheme: boolean;
  constructor(public dialogRef: MdDialogRef<ViewAuthorDialog>) { }

  ngOnInit(): void {
    this.author = this.dialogRef.componentInstance.name;
    // this.author = JSON.parse(this.author);
    console.debug("Data: "+this.author);
    this.settings = JSON.parse(localStorage.getItem('settings')) || {'isDarkTheme': true, 'name': 'Lorem ipsum', 'email': 'johnappleseed@gmail.com', 'birthday': '2003-12-23', 'showDeveloper': false};
    this.isDarkTheme = this.settings.isDarkTheme;
  }
}