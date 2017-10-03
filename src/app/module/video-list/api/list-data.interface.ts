import { IListItem } from './list-item.interface';

export interface IListData {
    items: IListItem[]

    /**
     * item count on current page
     *
     * @type {number}
     * @memberof IListData
     */
    pageItemCount: number;

    /**
     * total item count
     *
     * @type {number}
     * @memberof IListData
     */
    totalItemCount: number;
}
