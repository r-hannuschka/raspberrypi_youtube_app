import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(
    private httpClient: Http
  ) {}

  public list(param = {}) {

    const options: RequestOptionsArgs = {
      params: param
    };

    return this.httpClient
      .get('http://localhost:8080/api/youtube/index/list', options)
      .map( (res: Response) => res.json() );
  }

  public search(param = {}) {

    const options: RequestOptionsArgs = {
      params: param
    };

    return this.httpClient
      .get('http://localhost:8080/api/youtube/index/search', options)
      .map( (res: Response) => res.json() );
  }
}
