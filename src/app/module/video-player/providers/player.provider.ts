import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class PlayerProvider {

    private baseUrl = 'http://192.168.188.200:8080/api/video/player';

    constructor (
        private httpClient: Http
    ) {}

    public pauseVideo() {
        return this.httpClient
            .get(`${this.baseUrl}/pause`)
            .map( (res: Response) => res.json() );
    }

    public resumeVideo() {
        return this.httpClient
            .get(`${this.baseUrl}/resume`)
            .map( (res: Response) => res.json() );
    }

    public powerOff() {
        return this.httpClient
            .get(`${this.baseUrl}/shutdown`)
            .map( (res: Response) => res.json() );
    }

    public muteVideo() {
        return this.httpClient
            .get(`${this.baseUrl}/mute`)
            .map( (res: Response) => res.json() );
    }

    public unmuteVideo() {
        return this.httpClient
            .get(`${this.baseUrl}/unmute`)
            .map( (res: Response) => res.json() );
    }
}
