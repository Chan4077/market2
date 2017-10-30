export interface ItemComment {
	author: string;
	comment: string;
	avatar?: string;
	id?: number;
}

export interface Item {
    /** 
	 * The name of the item
	 * @type {string}
	 */
	name: string;
    /**
	 * The price of the item
	 * @type {number}
	 */
	price: number;
    /**
	 * The description of the item
	 * @type {string}
	 */
	description: string;
    /**
	 * The id of the item
	 * @type {number}
	 * */
	id?: number;
	/**
	 * Whether the user has an avatar
	 * @type {boolean}
	 */
	hasAvatar?: boolean;
	/**
	 * The user of the item
	 * @type {string}
	 */
	user?: string;
	/** 
	 * The job of the user
	 * @type {string}
	 */
	job?: string;
	/**
	 * Tags of the item
	 * @type {string[]}
	 */
	tags: string[];
	/**
	 * whether the item has an image
	 * @type {boolean}
	 */
	hasImage?: boolean;
	/**
	 * The source of the image
	 * @type {string}
	 */
	imgSource?: string;
	/** 
	 * The comments on the market item
	 * @type {ItemComment[]}
	 */
	comments: ItemComment[];
}
export interface Settings {
	isDarkTheme: boolean;
	name: string;
	email: string;
	birthday: Date | any;
	showDeveloper: boolean;
	showGreeting: boolean;
}
export interface Links {
    name: string;
    description: string;
    icon: string;
    href: string;
}