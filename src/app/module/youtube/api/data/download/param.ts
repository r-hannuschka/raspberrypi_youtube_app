import { IDownloadParam } from '@app-module/download/api/data/download/param';

export interface IYoutubeDownloadParam extends IDownloadParam {

    description?: string;

    imageUri?: string;

    video_id: string;
}
