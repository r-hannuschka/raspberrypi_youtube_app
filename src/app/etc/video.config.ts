import { IVideoConfig } from '../module/video/api/config';

export const videoConfig: IVideoConfig = {

    api: {
        // baseUrl: 'http://192.168.188.200:8080/api/video/'
        baseUrl: 'http://localhost:8080/api/video/'
    },

    list: {
        colCount: 2,

        itemsPerPage: 10
    }
};
