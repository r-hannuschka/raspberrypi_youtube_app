import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  private config;

  constructor(
    @Inject('YoutubeConfig') config,
    private httpClient: Http
  ) {
    this.config = config;
  }

  public list(param = {}) {

    const options: RequestOptionsArgs = {
      params: param
    };

    return this.httpClient
      .get(this.config.api.list, options)
      .map( (res: Response) => res.json() );
  }

  public search(param = {}) {

    const options: RequestOptionsArgs = {
      params: param
    };

    return this.httpClient
      .get(this.config.api.search, options)
      .map( (res: Response) => res.json() );
  }
}
