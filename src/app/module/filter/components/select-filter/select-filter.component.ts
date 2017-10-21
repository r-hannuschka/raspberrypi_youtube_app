import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOption } from '../../api/option.interface';
import { FilterService } from '../../provider/filter.service';
import { SelectFilterModel } from '../../model/select-filter.model';

@Component({
  selector: 'app-select-filter-component',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.css']
})
export class SelectFilterComponent implements OnInit {

  @Input()
  public model: SelectFilterModel;

  @Output()
  public select: EventEmitter<string>;

  public options: IOption[];

  public name: string;

  public label: string;

  public value: string | number;

  private filterService: FilterService;

  constructor(filterService: FilterService) {
    this.filterService = filterService;
    this.select = new EventEmitter();
  }

  ngOnInit(): void {
    this.options = this.model.getOptions();
    this.name    = this.model.getName();
    this.label   = this.model.getLabel();
    this.value   = this.model.getValue();
  }

  public onSelect(value) {
    const val = value.replace(/^\s*(.*?)\s*$/, '\$1');

    this.model.setValue(val);

    if (val !== '') {
       this.filterService.setFilter(this.model);
    } else {
      this.filterService.unsetFilter(this.model);
    }

    this.value = val;
    this.select.emit(val);
  }
}
