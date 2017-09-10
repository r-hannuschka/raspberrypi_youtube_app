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
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  private items: IItem[];

  private response: IResponseList;

  constructor(
    private pagination: PaginationService,
    private apiService: ApiService
  ) { }

  ngOnInit() {

    this.pagination
      .getNotifier()
      .subscribe( (event: IPageEvent) => {
        this.handlePagniationEvent(event);
      });

    // initial oder bei suche
    this.apiService
      .list().subscribe((res: IResponseList) => {
        this.handleResponse(res);
      });
  }

  /**
   * @todo refactor youtube does not support specific pages
   * display specific page
   *
   * @private
   * @param {number} page
   * @memberof ListComponent
   */
  private displayPage(page: number) {

    const param = {
      pageToken: this.response.data.nextPageToken
    };

    this.apiService
      .list(param).subscribe((res: IResponseList) => {
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

    if ( res.success ) {
      this.response = res;
      this.items    = res.data.items;

      this.pagination.update({
        itemPageCount: res.data.pageInfo.resultsPerPage,
        itemTotalCount: res.data.pageInfo.totalResults
      });
    }
  }

  /**
   * @todo refactor youtube dont support specific pages
   * handle pagination event
   *
   * @private
   * @param {IPageEvent} event
   * @memberof ListComponent
   */
  private handlePagniationEvent(event: IPageEvent) {
      switch ( event.name ) {
        case PaginationService.DISPLAY_PAGE:
          this.displayPage(event.data.page);
          break;
      }
  }
}
