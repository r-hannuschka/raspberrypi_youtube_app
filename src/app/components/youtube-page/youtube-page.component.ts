import { Component } from '@angular/core';
import { DownloadService } from '../../provider/download.service';
import { IListItem } from '../../module/youtube';
import { IYoutubeDownloadParam } from '../../module/youtube/api/data/download/param';

@Component({
  selector: 'app-youtube-page',
  templateUrl: './youtube-page.component.html',
  styleUrls: ['./youtube-page.component.css']
})
export class YoutubePageComponent {

  private downloadService: DownloadService;

  constructor( downloadService: DownloadService ) {
    this.downloadService = downloadService;
  }

  /**
   *
   * @param {IListItem} item
   * @memberof YoutubePageComponent
   */
  public downloadVideo(item: IListItem) {
    const downloadParam: IYoutubeDownloadParam = {
      description: item.description,
      video_id: item.id,
      name: item.title,
      imageUri: item.thumbnail,
      type: 'video'
    };
    this.downloadService.downloadVideo(downloadParam);
  }
}
