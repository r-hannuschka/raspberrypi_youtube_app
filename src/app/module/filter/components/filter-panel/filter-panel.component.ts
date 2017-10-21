import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilter } from '../../api/filter.interface';
import { IFilterResponse } from '../../api/filter-response.interface';
import { FilterService } from '../../provider/filter.service';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-panel.component.html',
})
export class FilterPanelComponent implements OnInit {

  @Input()
  public filters: IFilter[];

  @Output('apply')
  public apply: EventEmitter<IFilter[]>;

  @Output('remove')
  public remove: EventEmitter<IFilter[]>;

  private filterService: FilterService;

  private activeFilters: IFilter[];

  constructor(filterService: FilterService) {
    this.filterService = filterService;
    this.apply = new EventEmitter();
    this.remove = new EventEmitter();
  }

  ngOnInit() {
    this.activeFilters = this.filterService.getActiveFilters();
  }

  public removeFilter(filter: IFilter) {
    this.filterService.deactivateFilter(filter);
    this.activeFilters = this.filterService.getActiveFilters();
    this.remove.emit([].concat(filter));
  }

  public applyFilter() {

    const filtersSet = this.filterService.getFiltersSet();
    const activateFilter: IFilter[] = [];

    filtersSet.forEach( (filter: IFilter) => {
      activateFilter.push(filter);
    });

    this.filterService.activateFilters(activateFilter);
    this.activeFilters = this.filterService.getActiveFilters();
    this.apply.emit(this.filterService.getActiveFilters());
  }
}
