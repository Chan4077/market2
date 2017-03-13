import { Item } from '../marketitems';

export const ITEMS: Item[] = [
    {
        name: "Macbook Pro 13-inch 2016",
        price: 2030.00,
        description: "A cool looking MacBook Pro!",
        id: 1,
        hasAvatar: true,
        user: "Ron",
        job: "Designer of website",
        tags: ['technology', 'Apple', 'macbook-pro'],
        hasImage: true,
        imgSource: "macbook-pro-13-inch-2016.jpg"
    },
    {
        name: "50 GB Google Drive Storage",
        price: 15.50,
        description: "50 GB of Google Drive Storage. YAY!!!",
        id: 2,
        hasAvatar: false,
        user: "Johnny",
        job: "",
        tags: ['google-drive', 'drive-storage', 'promo-code'],
        hasImage: false,
        imgSource: ""
    },
    {
        name: "Visual Studio 2017",
        price: 5.50,
        description: "Promo code. Only 50% off!",
        id: 3,
        hasAvatar: false,
        user: "Ben",
        job: "Beginner",
        tags: ['promo-code', 'discount', 'technology', 'coding'],
        hasImage: false,
        imgSource: ""
    },
    {
        name: "Getting Started with Javascript - 9th Edition",
        price: 30.00,
        description: "",
        id: 4,
        hasAvatar: true,
        user: "Jane",
        job: "Help Expert",
        tags: ['javascript', 'technology', 'getting-started', 'books'],
        hasImage: false,
        imgSource: ""
    }
]