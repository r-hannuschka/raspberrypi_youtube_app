import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PaginationService } from '../../../pagination/providers/pagination.service';
import { IPageEvent } from '../../../pagination/api/page-event.interface';
import { IItem } from '../../api/data/item.interface';
import { IResponseList } from '../../api/http/response/response-list.interface';
import { ApiService } from '../../provider/api.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-youtube-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
  viewProviders: [PaginationService]
})
export class ListComponent implements OnInit {

  public isLoading = false;

  private items: IItem[] = [];

  private response: IResponseList;

  constructor(
    private pagination: PaginationService,
    private apiService: ApiService
  ) { }

  /**
   *
   *
   * @memberof ListComponent
   */
  public ngOnInit() {

    this.isLoading = true;

    this.pagination
      .getNotifier()
      .subscribe((event: IPageEvent) => {
        this.handlePagniationEvent(event);
      });

    // initial oder bei suche
    this.apiService
      .list().subscribe((res: IResponseList) => {
        this.handleResponse(res);
      });
  }

  /**
   * handle list response
   *
   * @private
   * @param {IResponseList} res
   * @memberof ListComponent
   */
  private handleResponse(res: IResponseList) {

    if (res.success) {
      this.response = res;
      this.items = this.items.concat(res.data.items);
      this.isLoading = false;

      /**
       * @todo fix me, timeout 0 to put this on next event cycle for js
       */
      window.setTimeout(() => {
        this.pagination.update({
          itemPageCount: res.data.pageInfo.resultsPerPage,
          itemTotalCount: res.data.pageInfo.totalResults
        });
      }, 0);
    }
  }

  /**
   * @private
   * @param {IPageEvent} event
   * @memberof ListComponent
   */
  private handlePagniationEvent(event: IPageEvent) {

    switch (event.name) {
      case PaginationService.DISPLAY_PAGE:
        const param = {
          pageToken: this.response.data.nextPageToken
        };

        this.apiService
          .list(param).subscribe((res: IResponseList) => {
            this.handleResponse(res);
          });

        this.isLoading = true;
        break;
    }
  }
}
