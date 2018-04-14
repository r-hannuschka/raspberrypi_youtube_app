import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output()
  search: EventEmitter<string> =  new EventEmitter<string>();

  private searchControl: FormControl;

  public isSend = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.searchControl = this.formBuilder.control('', [Validators.required]);
  }

  /**
   *
   * @memberof SearchBarComponent
   */
  public onSubmit(query: string) {
    this.isSend = true;

    if ( this.searchControl.valid ) {
      this.search.emit(this.searchControl.value);
      this.searchControl.setValue('');
      this.isSend = false;
    }
  }
}
