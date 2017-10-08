import { IItem } from '../../data/item.interface';

export interface IResponseList {
    data: {
        etag: string;

        id: string;

        items: IItem[];

        nextPageToken?: string;

        prevPageToken?: string;

        pageInfo: {
            resultsPerPage: number;
            totalResults: number;
        };
    };

    error: string[];

    success: boolean;
}
