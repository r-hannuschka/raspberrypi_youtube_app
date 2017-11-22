import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IDownload, DownloadService } from '../../module/youtube';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-download-component',
    templateUrl: './download.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit, OnDestroy {

    public description: string;

    public downloads: any[];

    public currentDownloads: Map<string, number>;

    private downloadService: DownloadService;

    private isDestroyed: Subject<boolean>;

    constructor(
        downloadService: DownloadService,
    ) {
        this.downloads = [];
        this.currentDownloads = new Map();
        this.downloadService = downloadService;
    }

    ngOnInit() {
        this.isDestroyed = new Subject<boolean>();
        this.initDownloads();
    }

    public ngOnDestroy() {
        this.isDestroyed.next(true);
        this.isDestroyed.unsubscribe();
        this.isDestroyed = null;
    }

    public cancelDownload(download) {
        this.downloadService
            .cancelDownload(download.id);
    }

    private initDownloads() {

        this.downloadService
            .getDownloads()
            .takeUntil( this.isDestroyed )
            .subscribe( this.handleDownloadsResponse.bind(this) );
    }

    private handleDownloadsResponse(downloads: IDownload[]) {
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
    }
}
