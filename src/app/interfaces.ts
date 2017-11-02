export interface ItemComment {
	/**
	 * The author of the comment
	 * @type {string}
	 */
	author: string;
	/**
	 * The comment itself
	 * @type {string}
	 */
	comment: string;
	/**
	 * The avatar image URL of the comment
	 * @type {string}
	 */
	avatar?: string;
	/**
	 * The ID of the comment
	 * @todo Remove this property
	 * @type {number}
	 */
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
	 * The avatar image source
	 * @type {string}
	 */
	avatarSrc?: string;
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
	/**
	 * Whether dark theme is enabled
	 * @type {boolean}
	 */
	isDarkTheme: boolean;
	/**
	 * The name of the currently logged-in user
	 * @type {string}
	 */
	name: string;
	/**
	 * The email of the currently logged-in user
	 * @type {string}
	 */
	email: string;
	/**
	 * The birthday of the currently logged-in user
	 * @type {Date|any}
	 */
	birthday: Date | any;
	/**
	 * Whether to enable developer settings
	 * @todo Add basic functionality
	 * @type {boolean}
	 */
	showDeveloper: boolean;
	/**
	 * Whether to show the app's logo with a progress spinner on load
	 * @todo Rename this property
	 * @type {boolean}
	 */
	showGreeting: boolean;
}
export interface Links {
	/**
	 * The name of the link
	 * @type {string}
	 */
	name: string;
	/**
	 * The description of the link
	 * @type {string}
	 */
	description: string;
	/**
	 * The icon of the link
	 * @type {string}
	 */
	icon?: string;
	/**
	 * The href of the link
	 * @type {string}
	 */
	href: string;
}