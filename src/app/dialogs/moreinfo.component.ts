import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { HighlightJsService } from 'angular2-highlight-js';
import { MdDialogRef } from '@angular/material';
@Component({
  selector: 'more-info-dialog',
  templateUrl: './moreinfo.component.html'
})

export class MoreInfoDialog implements OnInit, AfterViewInit {
  author: any;
  json: any;
  settings: any;
  isDarkTheme: boolean;
  constructor(public dialogRef: MdDialogRef<MoreInfoDialog>, private el: ElementRef, private service : HighlightJsService) { }

  ngOnInit() {
    this.author = this.dialogRef.componentInstance.json;
    // this.author = JSON.parse(this.author);
    console.debug("Data: "+this.author);
    this.settings = JSON.parse(localStorage.getItem('settings')) || {'isDarkTheme': true, 'name': 'Lorem ipsum', 'email': 'johnappleseed@gmail.com', 'birthday': '2003-12-23', 'showDeveloper': false};
    this.isDarkTheme = this.settings.isDarkTheme;
  }
  ngAfterViewInit() {
    this.service.highlight(this.el.nativeElement.querySelector('.json'));
  }
}