import { Injectable } from '@angular/core';
import { SocketManager } from '../../socket/provider/socket.manager.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { IDownload } from '../api';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DownloadService {

    public static readonly SOCKET_EVENT_CONNECTED = 'connect';

    public static readonly SOCKET_EVENT_DOWNLOAD_END = 'finish';

    public static readonly SOCKET_EVENT_DOWNLOAD_UPDATE = 'update';

    public static readonly SOCKET_EVENT_DOWNLOAD_INITIALIZED = 'initialized';

    private downloads: Map<string, IDownload>;

    private socketManager: SocketManager;

    private downloadStream: BehaviorSubject<IDownload[]>;

    private downloadSubs: number;

    private isListenToSocket = false;

    private hasDownloadSubs: Subject<boolean>;

    constructor(
        socketManager: SocketManager
    ) {
        this.socketManager = socketManager;
        this.downloads = new Map();

        this.downloadStream = new BehaviorSubject(
            Array.from(this.downloads.values())
        );

        this.downloadSubs = 0;
        this.hasDownloadSubs = new Subject<boolean>();
    }

    public cancelDownload(id) {

        if ( this.downloads.has(id) ) {
            this.socketManager
                .exec('youtube.download', {
                    action: 'cancel',
                    data: id
                });
        }
    }

    /**
     * send download order through sockets to server
     *
     * @memberof DownloadService
     */
    public downloadVideo(data) {
        /**
         * send download order to server
         */
        this.socketManager
            .exec('youtube.download', {
                action: 'download',
                data
            });
    }

    public getDownloads() {
        const observable: Observable<any> = Observable.create(observer => {

            // if we are not listing on socket channel do this now
            if ( ! this.isListenToSocket ) {
                this.registerSocketStream();
            }

            // add observer to subject to get notfied if something changes
            const sub = this.downloadStream.subscribe(observer);
            this.downloadSubs += 1;

            // unsubscribe
            return () => {
                sub.unsubscribe();
                this.downloadSubs -= 1;

                if ( this.downloadSubs <= 0 ) {
                    this.isListenToSocket = false;
                    this.hasDownloadSubs.next(false);
                }
            }
        });
        return observable;
    }

    private registerSocketStream() {

        this.isListenToSocket = true;

        this.socketManager
            .getMessages('youtube.download')
            .takeUntil(this.hasDownloadSubs)
            .bufferTime(500)
            .subscribe((response: any[]) => {

                if ( ! response.length) {
                    return;
                }

                response.forEach((responseData) => {
                    this.handleResponse(responseData);
                });

                this.downloadStream.next(
                    Array.from(this.downloads.values())
                );
            });
    }

    private handleResponse(response) {
        const download: IDownload | IDownload[] = response.data;
        const event: string = response.event;

        switch (event) {
            case DownloadService.SOCKET_EVENT_DOWNLOAD_INITIALIZED:
                this.addDownload(download as IDownload);
                break;
            case DownloadService.SOCKET_EVENT_DOWNLOAD_UPDATE:
                this.updateDownload(download as IDownload);
                break;
            case DownloadService.SOCKET_EVENT_CONNECTED:
                this.initDownloads(download as IDownload[]);
                break;
        }
    }

    private addDownload(download: IDownload) {
        this.downloads.set(download.pid, download);
    }

    private initDownloads(downloads: IDownload[]) {
        downloads.forEach( (download) => {
            this.addDownload(download);
        });
    }

    private updateDownload(download: IDownload) {
        if (this.downloads.has(download.pid)) {
            const task = this.downloads.get(download.pid);
            task.loaded = download.loaded;
            task.size   = download.size;
            task.state  = download.state;
        }
    }
}
