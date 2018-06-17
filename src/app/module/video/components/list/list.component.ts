import { Component, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { PaginationService } from '../../../pagination/providers/pagination.service';

import { IVideoFile, IVideoResponse } from '../../api/index';
import { VideoApiProvider } from '../../provider/video-api.provider';
import { IVideoConfig } from '../../api/config';

@Component({
  providers    : [PaginationService],  // provide own instance of Pagination Service
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

    this.pagination.pageChange.subscribe((page: number) => {
        this.page = page;
        this.loadVideos();
      });

    this.loadVideos();
  }

  public play(video: IVideoFile) {
    this.videoApi.playVideo(video)
      .subscribe( () => {
      });
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
      this.videos = response.videos;

      this.pagination.update({
        itemTotalCount: response.total
      });
  }
}
