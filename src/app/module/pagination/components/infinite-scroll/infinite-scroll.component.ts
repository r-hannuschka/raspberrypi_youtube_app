import { AfterViewInit, Component, ElementRef, Host, Input, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { PaginationService } from '../../providers/pagination.service';
import { IPageEvent } from '../../api/page-event.interface';
import { Observer, Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-pagination-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
})
export class InfiniteScrollComponent implements AfterViewInit, OnInit {

  @ViewChild('infiniteWrap')
  public contentWrapper: ElementRef;

  @Input()
  public autoLoadCount = -1;

  public showMore: boolean;

  private pagination: PaginationService;

  private wrapperCoordinates;

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

  ngAfterViewInit(): void {
    this.wrapperCoordinates =
      this.contentWrapper.nativeElement.getBoundingClientRect();
  }

  public loadNextPage(): void {
    this.showMore = false;
    this.pagination.showNextPage();
  }

  private getWindowScrollStream() {
    return Observable
      .fromEvent(window, 'scroll')
      .debounceTime(100)
      .map(() => {
        return window.pageYOffset;
      });
  }

  private handlePaginationEvent(event: IPageEvent) {

    if (event.name === PaginationService.UPDATE) {
      this.page = this.pagination.getCurrentPage();
      this.wrapperCoordinates =
        this.contentWrapper.nativeElement.getBoundingClientRect();
    }
  }

  private handleWindowScroll(val: number) {
    this.showMore = false;
    if ( val > (this.wrapperCoordinates.height + - 10) && this.page === this.pagination.getCurrentPage() ) {

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
