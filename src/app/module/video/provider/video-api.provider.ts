import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { API } from '../api/config/api';
import { Observable } from 'rxjs/Observable';

import { IVideoResponse, IVideoFile } from '../api';

@Injectable()
export class VideoApiProvider {

    private config: any;

    private playerConfig: any;

    constructor(
        @Inject('VideoConfig') config: any,
        @Inject('PlayerConfig') playerConfig: any,
        private httpProvider: Http
    ) {
        this.config = config;
        this.playerConfig = playerConfig;
    }

    /**
     * read file list from server
     *
     * @param {number} limit max items to load
     * @param {number} start we start at this point
     */
    public list(limit: number = 20, page: number = 1 ): Observable<IVideoResponse> {

        const requestArgs: RequestOptionsArgs = {
            params: {
                limit,
                page
            }
        };

        return this.httpProvider.get(this.config.api.list, requestArgs)
            .map( (res: Response): IVideoResponse => {
                const body = res.json();
                const videos: IVideoFile[] = body.data.videos;

                videos.forEach( (video, index: number) => {
                    if ( video.image && video.image.replace(/(^\s*|\s*$)/g, '') !== '' ) {
                        video.image = `${this.config.api.baseUrl}/${video.image}`;
                    }
                });

                return body.data;
            });
    }

    public playVideo(video: IVideoFile) {

        return this.httpProvider.get(this.playerConfig.api.play, {
            params: {
                video_id: video.id
            }
        })
        .map( (res: Response) => {
            return res.json();
        });
    }
}
