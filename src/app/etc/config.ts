const baseUrl = 'http://192.168.188.200:8080';

export const config = {
    module: {
        videoPlayer: {
            player: {
                api: {
                    pause   : `${baseUrl}/api/video/player/pause`,
                    play    : `${baseUrl}/api/video/player/play`,
                    resume  : `${baseUrl}/api/video/player/resume`,
                    shutdown: `${baseUrl}/api/video/player/shutdown`,
                    mute    : `${baseUrl}/api/video/player/mute`,
                    unmute  : `${baseUrl}/api/video/player/unmute`,
                }
            },
            playlist: {
                api: {
                    remove: `${baseUrl}/api/video/playlist/remove`
                }
            }
        },
        video: {
            api: {
                baseUrl,
                list: `${baseUrl}/api/video/list`
            },
            list: {
                colCount: 3,
                itemsPerPage: 12
            }
        },
        youtube: {
            api: {
                list  : `${baseUrl}/api/youtube/list`,
                search: `${baseUrl}/api/youtube/search`
            }
        }
    },
    rest: {
        baseUrl
    },
    socket: {
        baseUrl
    },
};
