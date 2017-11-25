import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IFile } from '../../api/data/file';
import { DownloadService } from '../../provider/download.service';
import { Subject } from 'rxjs/Subject';

import {
    DOWNLOAD_STATE_CANCEL,
    DOWNLOAD_STATE_ERROR,
    DOWNLOAD_STATE_FINISHED,
    DOWNLOAD_STATE_QUEUED,
    DOWNLOAD_STATE_START,
    IDownload
} from '../../api/data/download';

@Component({
    selector: 'app-download-component',
    templateUrl: './download.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit, OnDestroy {

    public description: string;

    public currentDownloads: Map<string, any>;

    public downloads: IDownload[];

    private downloadService: DownloadService;

    private isDestroyed: Subject<boolean>;

    constructor(
        downloadService: DownloadService,
    ) {
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

        this.currentDownloads.clear();
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

            if (
                download.state === DOWNLOAD_STATE_FINISHED ||
                download.state === DOWNLOAD_STATE_ERROR    ||
                download.state === DOWNLOAD_STATE_CANCEL
            ) {
                this.currentDownloads.delete(download.pid);
                return;
            }

            let downloadData;

            if ( this.currentDownloads.has(download.pid) ) {
                downloadData = this.currentDownloads.get(download.pid);
                downloadData.loaded = (Math.round(download.loaded * 100 / download.size) || 0) + '%';
                downloadData.state  = download.state;
            } else {
                this.currentDownloads.set(download.pid, {
                    id: download.pid,
                    loaded: (Math.round(download.loaded * 100 / download.size) || 0) + '%',
                    state: download.state,
                    raw: download.raw
                });
            }
        });
        this.downloads = Array.from(this.currentDownloads.values());
    }
}
