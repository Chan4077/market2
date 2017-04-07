import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'new-post',
    templateUrl: './new.component.html'
})
export class NewPostComponent implements OnInit{
    post: any;

    ngOnInit() {
        this.post = {"text": "Lorem ipsum dolor sit amet...", "author": "Some Account", "tags": ["wow", "lol", "test"], "date": new Date()}
    }
}