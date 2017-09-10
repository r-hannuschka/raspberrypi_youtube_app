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
      /** @todo make config */
      .get('http://192.168.188.31:8080/api/youtube/index/list', options)
      .map( (res: Response) => res.json() );
  }
}
