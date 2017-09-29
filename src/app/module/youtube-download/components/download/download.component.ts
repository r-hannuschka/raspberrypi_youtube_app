import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { YoutubeDownloadService } from '../../provider/youtube-download.provider';

@Component({
    selector: 'app-youtube-downloads',
    templateUrl: './download.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

    public description: string;

    public downloads: any[];

    private downloadService: YoutubeDownloadService;

    constructor(
        downloadService: YoutubeDownloadService,
    ) {
        this.downloads = [];
        this.downloadService = downloadService;
    }

    ngOnInit() {
        this.registerEvents();
    }

    public downloadVideo() {
        this.downloadService
            .downloadVideo({
                name: 'peppa_wutz_10.mp4',
                path: '/tmp',
                uri: 'https://www.youtube.com/watch?v=QuUi6x48WmQ'
            });
    }

    private registerEvents() {
        this.downloadService
            .getDownloads()
            .subscribe( (downloads) => {
                this.downloads = downloads;
            });
    }
}
