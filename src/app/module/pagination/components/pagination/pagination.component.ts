import { Component, ContentChild, Host, QueryList, ViewChildren, Input, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { PageNavigationComponent } from '../page-navigation/page-navigation.component';
import { PaginationService } from '../../providers/pagination.service';

@Component({
    selector: 'app-pagination',
    templateUrl: 'pagination.component.html',
    providers: [ PaginationService ],
    viewProviders: [ PaginationService ]
})

export class PaginationComponent implements OnInit {

  @Input()
  public type: 'page';

  constructor() { }

  ngOnInit() {
  }
}
