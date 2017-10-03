import { Injectable } from '@angular/core';
import { DataProvider, IRequest } from '../../video-list/provider/data.provider';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeApiProvider extends DataProvider {

  private currentPage = 1;

  private nextPageToken: string;

  private prevPageToken: string;

  constructor(
    private httpClient: Http
  ) {
    super();
  }

  public fetch(req: IRequest): Observable<any>
  {
    let request;

    const requestParam = this.createRequestParam(req.param);

    switch ( req.action ) {
      case DataProvider.ACTION_SEARCH:
        request = this.search(requestParam);
        break;
      default:
        request = this.list(requestParam);
    }

    return request;
  }

  protected list(param: RequestOptionsArgs): Observable<any>
  {
    return this.httpClient
      .get('http://localhost:8080/api/youtube/index/list', param)
      .map( (res: Response) => {
        return this.parseResponse( res.json() );
      });
  }

  protected search(options: RequestOptionsArgs)
  {
    const params = options.params as {[key: string]: any};

    if ( options.params.hasOwnProperty('query') ) {
      params.q = params.query;
      delete params.query;
    }

    return this.httpClient
      .get('http://localhost:8080/api/youtube/index/search', options)
      .map( (res: Response) => {
        return this.parseResponse( res.json() );
      });
  }

  private createRequestParam(data): RequestOptionsArgs
  {
    const param = Object.assign({}, data);

    if ( param.page && param.page !== this.currentPage ) {
      param.pageToken = param.page > this.currentPage ? this.nextPageToken : this.prevPageToken;
      this.currentPage = param.page;
      delete param.page;
    }

    return {
      params: param
    };
  }

  private parseResponse(res) {

    this.nextPageToken = res.data.nextPageToken;
    this.prevPageToken = res.data.prevPageToken;

    return res;
  }
}
