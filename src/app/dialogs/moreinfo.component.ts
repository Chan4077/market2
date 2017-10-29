import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as hljs from 'highlight.js';
@Component({
  selector: 'more-info-dialog',
  templateUrl: './moreinfo.component.html'
})

export class MoreInfoDialog implements OnInit, AfterViewInit {
  author: any;
  json: any;
  settings: any;
  isDarkTheme: boolean;
  constructor(public dialogRef: MatDialogRef<MoreInfoDialog>, private el: ElementRef) { }

  ngOnInit() {
    this.author = this.dialogRef.componentInstance.json;
    // this.author = JSON.parse(this.author);
    console.debug("Data: "+this.author);
    this.settings = JSON.parse(localStorage.getItem('settings')) || {'isDarkTheme': true, 'name': 'Lorem ipsum', 'email': 'johnappleseed@gmail.com', 'birthday': '2003-12-23', 'showDeveloper': false};
    this.isDarkTheme = this.settings.isDarkTheme;
  }
  ngAfterViewInit() {
    hljs.highlightBlock(this.el.nativeElement.querySelector('.json'));
  }
}