import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IDownload, DownloadService } from '../../module/youtube';

@Component({
    selector: 'app-download-component',
    templateUrl: './download.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

    public description: string;

    public downloads: any[];

    public currentDownloads: Map<string, number>;

    private downloadService: DownloadService;

    constructor(
        downloadService: DownloadService,
    ) {
        this.downloads = [];
        this.currentDownloads = new Map();
        this.downloadService = downloadService;
    }

    ngOnInit() {
        this.registerEvents();
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
