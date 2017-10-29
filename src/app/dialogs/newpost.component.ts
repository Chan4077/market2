import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'new-post-dialog',
    templateUrl: './newpost.component.html'
})
export class NewPostDialog implements OnInit {
    file: File;
    post: any;
    apiEndPoint: any;
    imageData: any;
    reader: FileReader;
    isDuplicate: boolean = false;
    constructor(public dialogRef: MatDialogRef<NewPostDialog>) { }
    /**
     * Adds a new post
     * @param post The post object
     * @todo Make this work (currently does console logging)
     */
    addNew(post) {
        console.log(post);
    }
    encodeImageFileAsURL(element) {
        console.log(element);
        var file = element.target.files[0];
        // this.reader.onloadend((reader) => {
        //     /** @todo Remove this line */
        //     console.log('RESULT', reader.result)
        //     this.imageData = 
        // })
    }
    /**
     * Adds a new tag
     * @param {HTMLInputElement} newTag The input tag
     */
    addTag(newTag: HTMLInputElement) {
        this.isDuplicate = false;
        var currentTags = this.post.tags, allTags = [];
        if (newTag.value && newTag.value.trim() != '' && !currentTags.includes(newTag.value)) {
            // Adds value to tags
            console.log("Current tags: " + this.post.tags);
            console.log(currentTags.length);
            console.log(currentTags[1]);
            for (var i = 0; i < currentTags.length; i++) {
                allTags[i] = currentTags[i];
            }
            allTags.push(newTag.value.trim());
            console.dir(allTags);
            this.post.tags = allTags;
            newTag.value = '';
        } else if (currentTags.includes(newTag.value)) {
            this.isDuplicate = true;
        }
    }
    /** @todo Complete this */
    getImage(): string {
        return;
    }
    ngOnInit() {
        this.post = {
            "text": "Lorem ipsum dolor sit amet...",
            "author": "Some Account",
            "tags": ["wow", "lol", "test"],
            "date": new Date(),
            "title": "Lorem ipsum",
            "price": "10.00",
            "img": "assets/items/default-item.png"
        }
    }
}