import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

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
  public onSubmit(query: string)
  {

    this.isSend = true;

    if ( this.searchControl.valid ) {
      // init search
    }
  }
}
