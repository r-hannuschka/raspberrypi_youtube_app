import { Injectable } from '@angular/core';
import { SocketManager } from '../../socket/provider/socket.manager.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export interface IDownload {
    isPending: boolean;
    isRunning: boolean;
    loaded: number;
    name: string;
    path: string;
    pid: string;
    size: number;
    state: string;
    uri: string;
}

@Injectable()
export class YoutubeDownloadService {

    public static readonly SOCKET_EVENT_CONNECTED = 'connect';

    public static readonly SOCKET_EVENT_DOWNLOAD_END = 'finish';

    public static readonly SOCKET_EVENT_DOWNLOAD_UPDATE = 'update';

    public static readonly SOCKET_EVENT_DOWNLOAD_INITIALIZED = 'initialized';

    private downloads: Map<string, IDownload>;

    private socketManager: SocketManager;

    private downloadStream: BehaviorSubject<IDownload[]>;

    private downloadSubs: number;

    private socketSream: any;

    private isListenToSocket: boolean;

    constructor(
        socketManager: SocketManager
    ) {
        this.socketManager = socketManager;
        this.downloads = new Map();

        this.downloadStream = new BehaviorSubject(
            Array.from(this.downloads.values())
        );

        this.socketSream = this.socketManager
            .getMessages('youtube.download');
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
     * @memberof YoutubeDownloadService
     */
    public downloadVideo(data) {
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
                this.isListenToSocket = true;
                this.socketSream
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

            // add observer to subject to get notfied if something changes
            const sub = this.downloadStream.subscribe(observer);
            this.downloadSubs += 1;

            // unsubscribe
            return () => {
                sub.unsubscribe();
                this.downloadSubs -= 1;

                if ( this.downloadSubs <= 0 ) {
                    this.isListenToSocket = false;
                    this.socketSream.unsubscribe();
                }
            }
        });
        return observable;
    }

    private handleResponse(response) {
        const download: IDownload | IDownload[] = response.data;
        const event: string = response.event;

        switch (event) {
            case YoutubeDownloadService.SOCKET_EVENT_DOWNLOAD_INITIALIZED:
                this.addDownload(download as IDownload);
                break;
            case YoutubeDownloadService.SOCKET_EVENT_DOWNLOAD_UPDATE:
                this.updateDownload(download as IDownload);
                break;
            case YoutubeDownloadService.SOCKET_EVENT_CONNECTED:
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
