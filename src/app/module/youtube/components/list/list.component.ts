import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PaginationService } from '../../../pagination/providers/pagination.service';
import { IPageEvent } from '../../../pagination/api/page-event.interface';
import { IItem } from '../../api/data/item.interface';
import { IResponseList } from '../../api/http/response/response-list.interface';
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

  private items: IItem[] = [];

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

    // initial oder bei suche
    this.apiService
      .list().subscribe((res: IResponseList) => {
        this.handleResponse(res);
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
      .subscribe( (res: IResponseList) => {
        this.updatePagination();
      });
  }

  private fetchData() {

    const param: any = {};

    let searchQuery = this.listDataModel.getSearchQuery();
    let request: any;

    searchQuery = searchQuery.replace(/\s*(.*?)\s*$/, '$1');

    // check page
    if ( this.listDataModel.getPage() !== 1 ) {
      param['pageToken'] = this.listDataModel.getNextPageToken()
    }

    if ( searchQuery.length ) {
      param['q'] = searchQuery;
      request = this.apiService.search(param)
    } else {
      request = this.apiService.list(param);
    }

    return request.map( (res: IResponseList) => {
      this.isLoading = false;
      return this.handleResponse(res);
    });
  }

  /**
   * @private
   * @param {IPageEvent} event
   * @memberof ListComponent
   */
  private handlePagniationEvent(event: IPageEvent) {
    this.listDataModel.setPage(event.data.page);
    this.fetchData().subscribe( () => {
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
      this.listDataModel.setNextPageToken( res.data.nextPageToken );
      this.listDataModel.setPrevPageToken( res.data.prevPageToken );
      this.listDataModel.setItemPageCount( res.data.pageInfo.resultsPerPage );
      this.listDataModel.setItemTotalCount( res.data.pageInfo.totalResults );

      /**
       * prepare items
       */
      this.listDataModel.setItems();

      // könnten die items nun noch umwandeln
      this.items = this.items.concat(res.data.items);
    }
  }

  private updatePagination() {
      // reset pagination
      this.pagination.update({
        currentPage   : this.listDataModel.getPage(),
        itemPageCount : this.listDataModel.getItemPageCount(),
        itemTotalCount: this.listDataModel.getItemTotalCount()
      });
  }
}
