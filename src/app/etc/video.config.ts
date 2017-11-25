import { IVideoConfig } from '../module/video/api/video.config';
import { API } from '../module/video/api/api';

const videoRestApi: API = {

    baseUrl: 'http://localhost:8080/api/video/',

    limit  :  20
};

export const videoConfig: IVideoConfig = {
    api: videoRestApi
};
