import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PaginationService } from '../../../pagination/providers/pagination.service';
import { IPageEvent } from '../../../../module/pagination/api/page-event.interface';

import { DataProvider } from '../../provider/data.provider';

/*
import { IItem } from '../../api/data/item.interface';
import { IResponseList } from '../../api/http/response/response-list.interface';
*/

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-video-list-component',
  styleUrls: ['./video-list.component.scss'],
  templateUrl: './video-list.component.html',
  viewProviders: [PaginationService]
})
export class VideoListComponent implements OnInit {

  public isLoading = false;

  private items: any[] = []; // IItem[] = [];

  private resetList: boolean;

  private isSearch: boolean;

  private searchQuery: string;

  constructor(
    private pagination: PaginationService,
    private dataProvider: DataProvider
  ) { }

  /**
   *
   *
   * @memberof ListComponent
   */
  public ngOnInit() {

    this.pagination
      .getNotifier()
      .subscribe((event: IPageEvent) => {
        this.handlePagniationEvent(event);
      });

    // initial oder bei suche
    this.doRequest();
  }

  public onSearch(query) {
    this.isSearch    = true;
    this.searchQuery = query;
    this.resetList   = true;

    this.doRequest();
  }

  /**
   *
   * @param data
   */
  private doRequest(param = {}) {

    const request = {
      action: DataProvider.ACTION_GET,
      param
    };

    if ( this.isSearch ) {
      request.action = DataProvider.ACTION_SEARCH;
      request.param['query'] = this.searchQuery;
    }

    this.dataProvider
      .fetch(request)
      .subscribe((res: any /*IResponseList*/) => {
        // clear list
        this.handleResponse(res);
      });

      this.isLoading = true;
  }

  /**
   * handle list response
   *
   * @private
   * @param {IResponseList} res
   * @memberof ListComponent
   */
  private handleResponse(res: any /*IResponseList*/) {

    if (res.success) {

      const paginationData = {
        itemPageCount: res.data.pageInfo.resultsPerPage,
        itemTotalCount: res.data.pageInfo.totalResults
      }

      if ( this.resetList ) {
        this.items = [];
        paginationData['currentPage'] = 1;
        this.resetList = false;
      }

      this.items = this.items.concat(res.data.items);
      this.isLoading = false;

      this.pagination.update(paginationData);
    }
  }

  /**
   * @private
   * @param {IPageEvent} event
   * @memberof ListComponent
   */
  private handlePagniationEvent(event: IPageEvent) {

    const param = {};

    switch (event.name) {

      case PaginationService.DISPLAY_PAGE:
        param['page'] = this.pagination.getCurrentPage();
        this.doRequest(param);
        break;
    }
  }
}
