import { IVideoFile } from '../data/video.file';

export interface IVideoResponse {

    videos: IVideoFile[];

    total: number;
}
