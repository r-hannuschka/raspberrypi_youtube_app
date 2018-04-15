import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class PlayerProvider {

    constructor (
        private httpClient: Http
    ) {}

    public pauseVideo() {
        return this.httpClient
            .get('http://192.168.188.200:8080/api/video/player/pause')
            .map( (res: Response) => res.json() );
    }

    public resumeVideo() {
        return this.httpClient
            .get('http://192.168.188.200:8080/api/video/player/resume')
            .map( (res: Response) => res.json() );
    }
}
