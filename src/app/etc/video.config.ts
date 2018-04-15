import { IVideoConfig } from '../module/video/api/config';

// 'http://192.168.188.200:8080/api/video/'
const baseUrl = 'http://192.168.188.200:8080/api';

export const videoConfig: IVideoConfig = {

    api: {
        baseUrl,
        video : {
            list: `${baseUrl}/video/list`,
        },
        player: {
            play: `${baseUrl}/video/player/play`
        }
    },

    list: {
        colCount: 2,

        itemsPerPage: 12
    }
};
