import { IVideoConfig } from '../module/video/api/config';

export const videoConfig: IVideoConfig = {

    api: {
        baseUrl: 'http://localhost:8080/api/video/'
    },

    list: {
        colCount: 2,

        itemsPerPage: 10
    }
};
