import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class PlaylistProvider {

    private baseUrl = 'http://192.168.188.200:8080/api/video/playlist';

    constructor (
        private httpClient: Http
    ) {}

    public removeFromQueue(id) {

        const options: RequestOptionsArgs = {
            params: { id }
        };

        return this.httpClient
            .get(`${this.baseUrl}/player/removeFromQueue`, options)
            .map( (res: Response ) => res.json() );
    }
}
