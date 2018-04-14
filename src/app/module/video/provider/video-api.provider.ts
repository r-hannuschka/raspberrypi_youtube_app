import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { API } from '../api/config/api';
import { Observable } from 'rxjs/Observable';

import { IVideoResponse, IVideoFile } from '../api';
import { IVideoConfig } from '../api/config';

@Injectable()
export class VideoApiProvider {

    private apiConfig: API;

    constructor(
        @Inject('VideoConfig') config: IVideoConfig,
        private httpProvider: Http
    ) {
        this.apiConfig = config.api;
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

        return this.httpProvider.get(this.apiConfig.video.list, requestArgs)
            .map( (res: Response): IVideoResponse => {
                const body = res.json();
                const videos: IVideoFile[] = body.data.videos;

                videos.forEach( (video, index: number) => {
                    if ( video.image && video.image.replace(/(^\s*|\s*$)/g, '') !== '' ) {
                        video.image = `http://localhost:8080/${video.image}`;
                    }
                });

                return body.data;
            });
    }

    public playVideo(video: IVideoFile) {
        this.httpProvider.post(this.apiConfig.video.play, {
            params: {
                video: video.id
            }
        });
    }
}
