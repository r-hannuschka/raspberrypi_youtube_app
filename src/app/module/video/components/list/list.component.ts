import { Component, Inject, OnInit, Input, TemplateRef } from '@angular/core';
import { PaginationService } from '../../../pagination/providers/pagination.service';
import { IPageEvent } from '../../../pagination/api/page-event.interface';

import { IVideoFile, IVideoResponse } from '../../api/index';
import { VideoApiProvider } from '../../provider/video-api.provider';
import { IVideoConfig } from '../../api/config';

@Component({
  providers    : [PaginationService],    // provide own instance of Pagination Service
  selector     : 'app-video-list',
  styleUrls    : ['./list.component.scss'],
  templateUrl  : './list.component.html',
  viewProviders: [PaginationService] // provide pagination service to children
})
export class ListComponent implements OnInit {

  @Input('actions')
  public actions: TemplateRef<any>;

  public videos: IVideoFile[];

  private page: number;

  private itemsPerPage: number;

  /**
   * constructor
   *
   * @param {PaginationService} pagination
   * @param {VideoApiProvider} fileApi
   */
  constructor(
    private pagination: PaginationService,
    private videoApi: VideoApiProvider,
    @Inject('VideoConfig') videoConfig: IVideoConfig
  ) {
    this.page = 1;
    this.itemsPerPage = videoConfig.list.itemsPerPage;
  }

  /**
   * component initialized
   *
   * @memberof ListComponent
   */
  public ngOnInit() {
    this.pagination.configure({
      itemPageCount: this.itemsPerPage || 18,
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

  public play(video: IVideoFile) {
    this.videoApi.playVideo(video);
  }

  public delete() {
  }

  /**
   * load videos from api
   *
   * @protected
   * @memberof ListComponent
   */
  protected loadVideos() {

    this.videoApi
      .list(this.itemsPerPage, this.page)
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
