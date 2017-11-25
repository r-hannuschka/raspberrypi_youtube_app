import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { API } from '../api/api';
import { Observable } from 'rxjs/Observable';

import { IVideoResponse } from '../api';
import { IVideoConfig } from '../api/video.config';

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

        return this.httpProvider.get(`${this.apiConfig.baseUrl}list`, requestArgs)
            .map( (res: Response): IVideoResponse => {
                const body = res.json();
                return body.data;
            });
    }
}
