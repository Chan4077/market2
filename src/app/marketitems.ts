import { ItemComments } from './marketitems-comment';
export interface Item {
    /** The name of the item */
    name: string;
    /** The price of the item */
    price: number;
    /** The description of the item */
    description: string;
    /** The id of the item */
    id?: number;
    /** If has avatar */
    hasAvatar?: boolean;
    /** User of item */
    user?: string;
    /** Job of user */
    job?: string;
    /** Tags of item */
    tags: any;
    /** If has image */
    hasImage?: boolean;
    /** Image source */
    imgSource?: string;
    /** Comments */
    comments: ItemComments;
}
// interface ItemComments {
//     author: string;
//     comment: string;
// }