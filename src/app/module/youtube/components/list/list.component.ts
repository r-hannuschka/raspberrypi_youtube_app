import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../../pagination/providers/pagination.service';

@Component({
  selector: 'app-youtube-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private pagination: PaginationService
  ) { }

  ngOnInit() {
    this.pagination.configure({
      itemTotalCount: 90,
      currentPage: 1
    });
  }
}
