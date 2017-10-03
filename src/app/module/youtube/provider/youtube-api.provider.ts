import { Injectable } from '@angular/core';
import { DataProvider, IRequest } from '../../video-list/provider/data.provider';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IListData, IListItem } from '../../video-list';
import { IResponseList, IItem } from '../api';

@Injectable()
export class YoutubeApiProvider implements DataProvider {

  private currentPage = 1;

  private nextPageToken: string;

  private prevPageToken: string;

  constructor(
    private httpClient: Http
  ) {}

  /**
   * fetch video data from server
   *
   * @param {IRequest} req
   * @returns {Observable<any>}
   * @memberof YoutubeApiProvider
   */
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

  /**
   *
   *
   * @protected
   * @param {RequestOptionsArgs} param 
   * @returns {Observable<IListData>} 
   * @memberof YoutubeApiProvider
   */
  public list(param: RequestOptionsArgs): Observable<IListData>
  {
    return this.httpClient
      .get('http://localhost:8080/api/youtube/index/list', param)
      .map( (res: Response) => {
        return this.parseResponse( res.json() );
      });
  }

  /**
   *
   *
   * @protected
   * @param {RequestOptionsArgs} options
   * @returns
   * @memberof YoutubeApiProvider
   */
  public search(options: RequestOptionsArgs)
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

  /**
   *
   *
   * @private
   * @param {any} data 
   * @returns {RequestOptionsArgs} 
   * @memberof YoutubeApiProvider
   */
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

  /**
   * parse youtube response list
   *
   * @private
   * @param {IResponseList} res
   * @returns {IListData}
   * @memberof YoutubeApiProvider
   */
  private parseResponse(res: IResponseList): IListData {
    this.nextPageToken = res.data.nextPageToken;
    this.prevPageToken = res.data.prevPageToken;

    const response: IListData = {
      pageItemCount: res.data.pageInfo.resultsPerPage,
      totalItemCount: res.data.pageInfo.totalResults,
      items: []
    };

    res.data.items.forEach( (item: IItem) => {
      const itemData: IListItem = {
        description: item.snippet.description || '',
        id: item.id,
        title: item.snippet.title || 'youtube video#' + item.id,
        thumbnail: ''
      };

      const thumbnailSizes = ['medium', 'high', 'maxres'];

      for ( let x = 0, ln = thumbnailSizes.length; x < ln; x++ ) {
        const resolution = thumbnailSizes[x];
        if (item.snippet.thumbnails.hasOwnProperty(resolution) ) {
          itemData.thumbnail = item.snippet.thumbnails[resolution].url;
          break;
        }
      }

      response.items.push(itemData)
    });

    return response;
  }
}
