import { IVideoConfig } from '../module/video/api/config';

// 'http://192.168.188.200:8080/api/video/'
const baseUrl = 'http://localhost:8080/api/video';

export const videoConfig: IVideoConfig = {

    api: {
        baseUrl,
        video : {
            list: `${baseUrl}/list`,
            play: `${baseUrl}/play`
        }
    },

    list: {
        colCount: 2,

        itemsPerPage: 10
    }
};
