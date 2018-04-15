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
      .get('http://192.168.188.200:8080/api/youtube/list', options)
      .map( (res: Response) => res.json() );
  }

  public search(param = {}) {

    const options: RequestOptionsArgs = {
      params: param
    };

    return this.httpClient
      .get('http://192.168.188.200:8080/api/youtube/search', options)
      .map( (res: Response) => res.json() );
  }
}
