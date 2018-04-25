import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class PlaylistProvider {

    private config;

    constructor (
        @Inject('PlaylistConfig') config: any,
        private httpClient: Http
    ) {
        this.config = config;
    }

    public remove(id) {

        const options: RequestOptionsArgs = {
            params: { id }
        };

        return this.httpClient
            .get(this.config.api.remove, options)
            .map( (res: Response ) => res.json() );
    }
}
