import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IDownload, YoutubeDownloadService } from '../../provider/youtube-download.provider';

@Component({
    selector: 'app-youtube-downloads',
    templateUrl: './download.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

    public description: string;

    public downloads: any[];

    public currentDownloads: Map<string, number>;

    private downloadService: YoutubeDownloadService;

    constructor(
        downloadService: YoutubeDownloadService,
    ) {
        this.downloads = [];
        this.currentDownloads = new Map();
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
                uri: 'https://www.youtube.com/watch?v=unEaSyx-LjE'
            });
    }

    public cancelDownload(download) {
        this.downloadService
            .cancelDownload(download.id);
    }

    private registerEvents() {

        this.downloadService
            .getDownloads()
            .subscribe( (downloads: IDownload[]) => {

                downloads.forEach( (download: IDownload) => {
                    let downloadData;
                    if ( this.currentDownloads.has(download.pid) ) {
                        downloadData = this.downloads[this.currentDownloads.get(download.pid)];
                        downloadData.loaded = (Math.round(download.loaded * 100 / download.size) || 0) + '%';
                        downloadData.state  = download.state;
                    } else {
                        this.downloads.push({
                            id: download.pid,
                            name: download.name,
                            loaded: (Math.round(download.loaded * 100 / download.size) || 0) + '%',
                            state: download.state
                        });
                        this.currentDownloads.set(download.pid, this.downloads.length - 1);
                    }
                });
            });
    }
}
