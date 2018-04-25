import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class PlayerProvider {

    private config;

    constructor (
        @Inject('PlayerConfig') config: any,
        private httpClient: Http
    ) {
        this.config = config;
    }

    public pauseVideo() {
        return this.httpClient
            .get(this.config.api.pause)
            .map( (res: Response) => res.json() );
    }

    public resumeVideo() {
        return this.httpClient
            .get(this.config.api.resume)
            .map( (res: Response) => res.json() );
    }

    public powerOff() {
        return this.httpClient
            .get(this.config.api.shutdown)
            .map( (res: Response) => res.json() );
    }

    public muteVideo() {
        return this.httpClient
            .get(this.config.api.mute)
            .map( (res: Response) => res.json() );
    }

    public unmuteVideo() {
        return this.httpClient
            .get(this.config.api.unmute)
            .map( (res: Response) => res.json() );
    }
}
