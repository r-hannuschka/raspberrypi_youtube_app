import { Component, ElementRef, Host, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { PaginationService } from '../../providers/pagination.service';
import { IPageEvent } from '../../api/page-event.interface';
import { Observer, Observable } from 'rxjs/Rx';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-pagination-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit {

  @ViewChild('infiniteWrap')
  public contentWrapper: ElementRef;

  @Input()
  public autoLoadCount = -1;

  public showMore: boolean;

  private pagination: PaginationService;

  private page: number;

  constructor(
    @Host() pagination: PaginationService
  ) {
    this.pagination = pagination;
  }

  ngOnInit(): void {

    this.page = this.pagination.getCurrentPage();
    this.showMore = false;

    // register pagniation events
    this.pagination
      .getNotifier()
      .subscribe((event: IPageEvent) => this.handlePaginationEvent(event));

    // register window scroll event
    this.getWindowScrollStream()
      .subscribe((top) => {
        this.handleWindowScroll(top);
      });
  }

  public loadNextPage(): void {
    this.showMore = false;
    this.pagination.showNextPage();
  }

  /**
   * get observable for window scroll event every 100ms
   *
   * @private
   * @returns
   * @memberof InfiniteScrollComponent
   */
  private getWindowScrollStream() {

    return Observable
      .fromEvent(window, 'scroll')
      .debounceTime(150)
      .map(() => {
        const data = this.contentWrapper.nativeElement.getBoundingClientRect();
        const next = Math.abs(data.top) + window.innerHeight >= data.height - 50;
        return next;
      });
  }

  /**
   * handle pagination service event
   *
   * @private
   * @param {IPageEvent} event
   * @memberof InfiniteScrollComponent
   */
  private handlePaginationEvent(event: IPageEvent) {
    if (event.name === PaginationService.UPDATE) {
      this.page = this.pagination.getCurrentPage();
    }
  }

  /**
   * handle window scroll event
   *
   * @private
   * @param {number} val
   * @memberof InfiniteScrollComponent
   */
  private handleWindowScroll( nextpage: boolean) {

    this.showMore = false;

    if ( nextpage && this.page === this.pagination.getCurrentPage() ) {

      const loadNextPage: boolean =
        this.autoLoadCount === -1 || this.pagination.getCurrentPage() < this.autoLoadCount;

      if ( loadNextPage ) {
        this.pagination.showNextPage();
      }

      if ( ! this.pagination.isLastPage() && ! loadNextPage ) {
        this.showMore = true;
      }
    }
  }
}
