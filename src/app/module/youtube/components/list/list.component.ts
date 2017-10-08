import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaginationService } from '../../../pagination/providers/pagination.service';
import { IPageEvent } from '../../../pagination/api/page-event.interface';
import { IItem, IListItem, IResponseList } from '../../api';
import { ApiService } from '../../provider/api.service';
import { ListDataModel } from '../../model/list-data.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-youtube-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
  viewProviders: [PaginationService]
})
export class ListComponent implements OnInit {

  public isLoading = false;

  private items: IListItem[] = [];

  private listDataModel: ListDataModel;

  constructor(
    private pagination: PaginationService,
    private apiService: ApiService
  ) {
    this.listDataModel = new ListDataModel();
    this.listDataModel.setPage(1);
    this.listDataModel.setSearchQuery('');
  }

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

    this.fetchData()
      .subscribe((items: IListItem[]) => {
        this.items = items;
        this.pagination.configure({
          currentPage: 1,
          itemPageCount: this.listDataModel.getItemPageCount(),
          itemTotalCount: this.listDataModel.getItemTotalCount()
        });
      });
  }

  /**
   *
   * @param {string} query
   * @memberof ListComponent
   */
  public handleSearch(query: string) {
    this.listDataModel.setSearchQuery(query);
    this.listDataModel.setPage(1);

    this.fetchData()
      .subscribe((items: IListItem[]) => {
        this.items = items;
        // items not added yet
        window.setTimeout(() => {
        }, 100);
      });
  }

  /**
   *
   *
   * @private
   * @returns
   * @memberof ListComponent
   */
  private fetchData(): Observable<IListItem[]> {
    const param: any = {};
    this.isLoading = true;
    this.pagination.disable(true);

    let request: any;

    // trim search query

    // check page
    if (this.listDataModel.getPage() !== 1) {
      param['pageToken'] = this.listDataModel.getNextPageToken()
    }

    const searchQuery = this.listDataModel.getSearchQuery().replace(/\s*(.*?)\s*$/, '$1');

    if (searchQuery.length) {
      param['q'] = searchQuery;
      request = this.apiService.search(param);
    } else {
      request = this.apiService.list(param);
    }

    return request.map((res: IResponseList) => {
      this.isLoading = false;
      this.pagination.disable(false);
      return this.handleResponse(res);
    });
  }

  /**
   * @private
   * @param {IPageEvent} event
   * @memberof ListComponent
   */
  private handlePagniationEvent(event: IPageEvent) {

    if (event.name === PaginationService.DISPLAY_PAGE) {
      this.listDataModel.setPage(event.data.page);

      this.fetchData().subscribe((items: IListItem[]) => {
        this.items = this.items.concat(items);
      });
    }
  }

  /**
   * handle list response
   *
   * @private
   * @param {IResponseList} res
   * @memberof ListComponent
   */
  private handleResponse(res: IResponseList) {

    const items: IListItem[] = [];

    if (res.success) {

      this.listDataModel.setNextPageToken(res.data.nextPageToken);
      this.listDataModel.setPrevPageToken(res.data.prevPageToken);
      this.listDataModel.setItemPageCount(res.data.pageInfo.resultsPerPage);
      this.listDataModel.setItemTotalCount(res.data.pageInfo.totalResults);

      res.data.items.forEach((responseItem: IItem) => {
        const item: IListItem = {
          description: responseItem.snippet.description || '',
          id: responseItem.id,
          title: responseItem.snippet.title || 'youtube video#' + responseItem.id,
          thumbnail: ''
        };

        const thumbnailSizes = ['medium', 'high', 'maxres'];

        for (let x = 0, ln = thumbnailSizes.length; x < ln; x++) {
          const resolution = thumbnailSizes[x];
          if (responseItem.snippet.thumbnails.hasOwnProperty(resolution)) {
            item.thumbnail = responseItem.snippet.thumbnails[resolution].url;
            break;
          }
        }

        items.push(item);
      });
    }

    return items;
  }

  private updatePagination() {
    // reset pagination
    this.pagination.update({
      currentPage: this.listDataModel.getPage(),
      itemPageCount: this.listDataModel.getItemPageCount(),
      itemTotalCount: this.listDataModel.getItemTotalCount()
    });
  }
}
