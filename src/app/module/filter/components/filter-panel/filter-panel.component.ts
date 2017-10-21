import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilter } from '../../api/filter.interface';
import { FilterService } from '../../provider/filter.service';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-panel.component.html',
})
export class FilterPanelComponent implements OnInit {

  @Input()
  public filters: IFilter[];

  @Output('apply')
  public apply: EventEmitter<{[key: string]: any}[]>;

  private filterService: FilterService;

  constructor(filterService: FilterService) {
    this.filterService = filterService;
    this.apply = new EventEmitter();
  }

  ngOnInit() {
  }

  public applyFilter() {

    /*
    const filters = this.filterService.getFilters().reduce( (active, filter) => {
      active.push(filter[0]);
      return active;
    }, []);

    this.filters.forEach(filter => {
      filter.setActive( filters.indexOf (filter.getName() ) > -1 );
    });
    */

    this.apply.emit(
      this.filterService.getFilters());
  }
}
