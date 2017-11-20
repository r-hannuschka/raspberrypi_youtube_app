import { Component, OnInit } from '@angular/core';
import { IListItem, DownloadService } from '../../module/youtube';

@Component({
  selector: 'app-youtube-page',
  templateUrl: './youtube-page.component.html',
  styleUrls: ['./youtube-page.component.css']
})
export class YoutubePageComponent implements OnInit {

  private downloadService: DownloadService;

  constructor( downloadService: DownloadService ) {
    this.downloadService = downloadService;
  }

  ngOnInit() {
  }

  /**
   *
   * @param {IListItem} item
   * @memberof YoutubePageComponent
   */
  public downloadVideo(item: IListItem) {
    this.downloadService.downloadVideo({
      name: item.title,
      id: item.id
    });
  }
}
