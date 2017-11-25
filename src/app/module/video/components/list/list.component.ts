import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../../pagination/providers/pagination.service';
import { IPageEvent } from '../../../pagination/api/page-event.interface';

import { IVideoFile, IVideoResponse } from '../../api/index';
import { VideoApiProvider } from '../../provider/video-api.provider';

@Component({
  providers    : [PaginationService],    // provide own instance of Pagination Service
  selector     : 'app-video-list',
  styleUrls    : ['./list.component.scss'],
  templateUrl  : './list.component.html',
  viewProviders: [PaginationService] // provide pagination service to children
})
export class ListComponent implements OnInit {

  public videos: IVideoFile[];

  private page: number;

  /**
   * constructor
   *
   * @param {PaginationService} pagination
   * @param {VideoApiProvider} fileApi
   */
  constructor(
    private pagination: PaginationService,
    private fileApi: VideoApiProvider
  ) {
    this.page = 1;
  }

  /**
   * component initialized
   *
   * @memberof ListComponent
   */
  public ngOnInit() {
    // just say we have 90 items
    this.pagination.configure({
      itemPageCount: 18,
      currentPage: 1
    });

    this.pagination
      .getNotifier()
      .subscribe((event: IPageEvent) => {
        this.handlePaginationEvent(event);
      });

    // load videos
    this.loadVideos();
  }

  /**
   * load videos from api
   *
   * @protected
   * @memberof ListComponent
   */
  protected loadVideos() {

    this.fileApi
      .list(18, this.page)
      .subscribe( (response: IVideoResponse) => {
        this.handleApiResponse(response);
      });
  }

  /**
   * handle api response
   *
   * @protected
   * @param {IVideoResponse} response 
   * @memberof ListComponent
   */
  protected handleApiResponse(response: IVideoResponse) {
      const total: number = response.total;
      this.pagination.update({
        itemTotalCount: total
      });
      this.videos = response.videos;
  }

  /**
   * handle pagination event
   *
   * @protected
   * @param {IPageEvent} event
   * @memberof ListComponent
   */
  protected handlePaginationEvent(event: IPageEvent) {
    switch ( event.name ) {
      case PaginationService.DISPLAY_PAGE:
          this.page = this.pagination.getCurrentPage();
          this.loadVideos();
        break;
    }
  }
}
