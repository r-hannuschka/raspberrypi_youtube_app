import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

import { IFilter } from '../api/filter.interface';
import { IFilterResponse } from '../api/filter-response.interface';

@Injectable()
export class FilterService {

  public static readonly ACTIVATE_FILTER = 'activate_filter';

  public static readonly CLEAR_FILTER = 'clear_filter';

  public static readonly DEACTIVATE_FILTER = 'activate_filter';

  public static readonly SET_FILTER = 'set_filter';

  public static readonly UNSET_FILTER = 'unset_filter';

  private filters: Set<IFilter> = new Set();

  private filterSubject: Subject<IFilterResponse>;

  public constructor() {
    this.filterSubject = new Subject();
  }

  public getFilterData(): Observable<IFilterResponse>
  {
    const observer = Observable.create( (obs: Observer<IFilterResponse>) => {
      this.filterSubject.subscribe(obs);
    });
    return observer;
  }

  /**
   * set new filter
   *
   * @param {string} name
   * @param {*} value
   * @memberof FilterService
   */
  public setFilter(filter: IFilter) {
    this.filters.add(filter);
    this.sendMessage(FilterService.SET_FILTER, filter);
  }

  /**
   *
   *
   * @param {IFilter} filter
   * @memberof FilterService
   */
  public unsetFilter(filter: IFilter) {
    if ( this.filters.has(filter) ) {
      this.filters.delete(filter);
      this.sendMessage(FilterService.UNSET_FILTER, filter);
    }
  }

  /**
   * activate filters
   *
   * @param {(IFilter|IFilter[])} filter
   * @memberof FilterService
   */
  public activateFilters(filter$: IFilter|IFilter[]) {
    const filters = ! (filter$ instanceof Array) ? [filter$] : filter$;
    filters.forEach( (filter: IFilter) => {
      if ( this.filters.has(filter) ) {
        filter.setActive(true);
      }
    });
    this.sendMessage(FilterService.ACTIVATE_FILTER, filters);
  }

  /**
   * deactivate filter
   *
   * @param {(IFilter|IFilter[])} filter
   * @memberof FilterService
   */
  public deactivateFilter(filter$: IFilter|IFilter[]) {
    const filters = ! ( filter$ instanceof Array) ? [filter$] : filter$;
    filters.forEach( (filter: IFilter) => {
      if ( this.filters.has(filter) ) {
        filter.setActive(false);
      }
    });
    this.sendMessage(FilterService.DEACTIVATE_FILTER, filters);
  }

  public getFiltersSet(): IFilter[] {
    return Array.from(this.filters);
  }

  public clearFilter() {
    this.filters.forEach( (filter: IFilter) => {
      filter.setActive(false);
      filter.reset();
    });
  }

  public getActiveFilters(): IFilter[] {
    const activeFilters: IFilter[] = [];
    this.filters.forEach( (filter: IFilter) => {
      if ( filter.isActive() ) {
        activeFilters.push(filter);
      }
    });
    return activeFilters;
  }

  private sendMessage(action: string, filters: IFilter | IFilter[]) {
    filters = ! ( filters instanceof Array ) ? [filters] : filters;
    this.filterSubject.next({
      action,
      filters
    });
  }
}
