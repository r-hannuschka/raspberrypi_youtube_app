import { ISnippet } from './snippet.interface';

export interface IItem
{
    etag: string;

    id: string;

    kind: string;

    snippet: ISnippet;
}