interface ItemComment {
    author: string;
    comment: string;
    avatar?: string;
    id?: number;
}
export interface ItemComments extends Array<ItemComment> {}