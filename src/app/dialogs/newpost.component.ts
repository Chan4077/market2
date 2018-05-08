import { SharedInjectable } from '../shared';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'new-post-dialog',
	templateUrl: './newpost.component.html'
})
export class NewPostDialog implements OnInit {
	file: File;
	post: Post;
	apiEndPoint: any;
	imageData: any;
	reader: FileReader;
	isDuplicate: boolean = false;
	newTag: string = "";
	showPreview: boolean = false;
	constructor(private dialogRef: MatDialogRef<NewPostDialog>, private shared: SharedInjectable) { }
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
	addTag() {
		this.isDuplicate = false;
		var currentTags = this.post.tags, allTags = [];
		if (this.newTag && this.newTag.trim() != '' && !currentTags.includes(this.newTag)) {
			// Adds value to tags
			console.log("Current tags: " + this.post.tags);
			console.log(currentTags.length);
			console.log(currentTags[1]);
			for (var i = 0; i < currentTags.length; i++) {
				allTags[i] = currentTags[i];
			}
			allTags.push(this.newTag.trim());
			console.dir(allTags);
			this.post.tags = allTags;
			this.newTag = '';
		} else if (currentTags.includes(this.newTag)) {
			this.isDuplicate = true;
		}
	}
	/** @todo Complete this */
	getImage(): string {
		return;
	}
	addItem() {
		console.log(this.post);
		let snackBarRef = this.shared.openSnackBarWithRef({ msg: "Successfully added an item to the Market. This item will eventually be public soon.", action: "Undo", additionalOpts: { horizontalPosition: "start", extraClasses: ['mat-elevation-z3'] } });
		snackBarRef.onAction().subscribe(() => {
			// TODO
		})
	}
	ngOnInit() {
		this.post = {
			"text": "Lorem ipsum dolor sit amet...",
			"author": "Some Account",
			"tags": ["wow", "lol", "test"],
			"date": new Date(),
			"title": "Lorem ipsum",
			"price": 10,
			"img": "assets/items/default-item.png"
		}
	}
}

export interface Post {
	hasImage?: boolean;
	title: string;
	text?: string;
	price: number;
	tags: string[]|any;
	img?: string|any;
	author: string;
	date: Date|any;
}