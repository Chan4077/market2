import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
@Component({
  selector: 'view-author-dialog',
  templateUrl: './viewauthor.component.html'
})

export class ViewAuthorDialog implements OnInit {
  author: any;
  name: string;
  constructor(public dialogRef: MdDialogRef<ViewAuthorDialog>) { }

  ngOnInit(): void {
    this.author = this.dialogRef.componentInstance.name;
    // this.author = JSON.parse(this.author);
    console.debug("Data: "+this.author);
  }
}