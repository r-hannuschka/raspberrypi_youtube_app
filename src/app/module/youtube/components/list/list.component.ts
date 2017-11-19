import { Component, OnInit, ViewEncapsulation, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaginationService } from '../../../pagination/providers/pagination.service';
import { IPageEvent } from '../../../pagination/api/page-event.interface';
import { IItem, IListItem, IResponseList } from '../../api';
import { ApiService } from '../../provider/api.service';
import { ListDataModel } from '../../model/list-data.model';

import { IFilter } from '../../../filter/api/filter.interface';
import { FilterFactory } from '../../../filter/model/filter.factory';
import { FilterService } from '../../../filter/provider/filter.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-youtube-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
  viewProviders: [PaginationService]
})
export class ListComponent implements OnInit {

  public isLoading = false;

  public filters: IFilter[];

  public isFilterActive = false;

  @Input('actions')
  public actions: TemplateRef<any>;

  private filterFactory: FilterFactory;

  private items: IListItem[] = [];

  private listDataModel: ListDataModel;

  /**
   * we actually searching
   *
   * @private
   * @memberof ListComponent
   */
  private isSearch = false;

  constructor(
    private apiService: ApiService,
    private filterService: FilterService,
    private pagination: PaginationService
  ) {
    this.listDataModel = new ListDataModel();
    this.filterFactory = FilterFactory.getInstance();

    this.listDataModel.setPage(1);
    this.listDataModel.setSearchQuery('');

    this.filters = this.createFilter();
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

  public onApplyFilter(filters) {
    this.reloadList()
      .subscribe();
  }

  public onRemoveFilter() {
    this.reloadList()
      .subscribe();
  }

  /**
   *
   * @param {string} query
   * @memberof ListComponent
   */
  public handleSearch(query: string) {

    this.listDataModel.setSearchQuery(query);
    this.listDataModel.setPage(1);
    this.filterService.clearFilter();

    if ( this.isFilterActive ) {
      this.toggleFilterDisplay();
    }

    this.reloadList()
      .subscribe( (items: IListItem[]) => {
        this.isSearch = true;
      });
  }

  /**
   * toggle filter visibility mode
   *
   * @memberof ListComponent
   */
  public toggleFilterDisplay() {
    this.isFilterActive = !this.isFilterActive;
  }

  /**
   *
   *
   * @private
   * @returns {IFilter[]}
   * @memberof ListComponent
   */
  private createFilter(): IFilter[] {

    const videoDefinitionFilter: IFilter = this.filterFactory.createSelectFilter(
      'videoDefinition', 'Auflösung', [
        { label: 'mittel', value: 'standard' },
        { label: 'hoch', value: 'high' }
      ]);

    const videoDurationFilter: IFilter = this.filterFactory.createSelectFilter(
      'videoDuration', 'Länge', [
        { label: 'kurz (max 4min)', value: 'short' },
        { label: 'medium (max 20 min)', value: 'medium' },
        { label: 'lang (20+ min)', value: 'long' }
      ]);

    return [
      videoDefinitionFilter,
      videoDurationFilter
    ];
  }

  private reloadList() {
    this.listDataModel.setPage(1);

    return this.fetchData()
      .map((items: IListItem[]) => {
        this.items = items;
        this.updatePagination();
        return items;
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

    let param: any = {};
    const searchQuery = this.listDataModel.getSearchQuery().replace(/\s*(.*?)\s*$/, '$1');
    const filters = this.getFilters();

    // add filters to params
    param = Object.assign(filters);

    this.isLoading = true;
    this.pagination.disable(true);

    let request: any;

    // check page
    if (this.listDataModel.getPage() !== 1) {
      param['pageToken'] = this.listDataModel.getNextPageToken()
    }

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
   *
   *
   * @private
   * @returns {{[key: string]: any}} filters
   * @memberof ListComponent
   */
  private getFilters(): {[key: string]: any} {
    const activeFilters = this.filterService.getActiveFilters();
    const filters: {[key: string]: any} = {};
    activeFilters.forEach( (filter: IFilter) => {
      filters[filter.getName()] = filter.getValue();
    });

    return filters;
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
    const thumbnailSizes = ['medium', 'high', 'maxres'];

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
   *
   *
   * @private
   * @memberof ListComponent
   */
  private updatePagination() {
    // reset pagination
    this.pagination.update({
      currentPage: this.listDataModel.getPage(),
      itemPageCount: this.listDataModel.getItemPageCount(),
      itemTotalCount: this.listDataModel.getItemTotalCount()
    });
  }

  /**
   *
   *
   * @private
   * @memberof ListComponent
   */
  private resetPage() {
    this.listDataModel.setPage(0);
  }
}
