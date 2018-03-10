import { IFile } from './file';

export const DOWNLOAD_STATE_FINISHED = 'end';
export const DOWNLOAD_STATE_CANCEL   = 'cancel';
export const DOWNLOAD_STATE_ERROR    = 'error';
export const DOWNLOAD_STATE_INITIALIZE = 'initialize';
export const DOWNLOAD_STATE_QUEUED   = 'queued';
export const DOWNLOAD_STATE_START    = 'start';

export interface IDownload {

    error: string;

    file: {
        fileName: string;

        imageUri: string;

        loaded: number;

        path: string;

        size: number;

        title: string;

        video_id: string;
    };

    group: string;

    id: string;

    state: string;
}
