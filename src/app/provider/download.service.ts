import { Injectable } from '@angular/core';
import { SocketManager } from './socket.manager.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/mergeMap';

import { IDownload } from '../api/data/download';
import { IDownloadParam } from '../api/data/download/param';
import { IDownloadResponse } from '../api/socket/download.response';

@Injectable()
export class DownloadService {

    public static readonly SOCKET_EVENT_CONNECTED = 'connect';

    public static readonly SOCKET_EVENT_DOWNLOAD_QUEUED = 'download_provider.downloadqueued';

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

    /**
     * cancel current download
     *
     * @param {string} id
     * @memberof DownloadService
     */
    public cancelDownload(id) {

        if ( this.downloads.has(id) ) {
            this.socketManager
                .exec('youtube.download', {
                    action: 'cancel',
                    param: id
                });
        }
    }

    /**
     * send download order through sockets to server
     *
     * @memberof DownloadService
     */
    public downloadVideo(param: IDownloadParam) {
        /**
         * send download order to server
         */
        this.socketManager
            .exec('youtube.download', {
                action: 'download',
                param
            });
    }

    /**
     * returns observable to get existing downloads or to get notified
     * on downloads changes / added
     *
     * @returns {Observable<IDownload[]>}
     * @memberof DownloadService
     */
    public getDownloads(): Observable<IDownload[]> {
        const observable: Observable<IDownload[]> = Observable.create(observer => {

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

    /**
     * register to socket for channel youtube.download to get notified
     * something has changed or we got connected.
     *
     * @private
     * @memberof DownloadService
     */
    private registerSocketStream() {

        this.isListenToSocket = true;

        this.socketManager
            .getMessages('youtube.download')
            .takeUntil(this.hasDownloadSubs)
            .bufferTime(500)
            .filter( (response: IDownloadResponse[]) => {
                return !! response.length;
            })
            .map( this.reduceDownloadResponseList )
            .subscribe((responseList: IDownloadResponse[]) => {
                responseList.forEach((response: IDownloadResponse) => {
                    this.handleResponse(response);
                });

                this.downloadStream.next(
                    Array.from(this.downloads.values())
                );
            });
    }

    /**
     * make messages uniqe, the last message of an specific event will be the value
     *
     * messages = [
     *  { event: 'update', data: { pid: 'abc'} }
     *  { event: 'update', data: { pid: 'abc'} }
     *  { event: 'update', data: { pid: 'def'} }
     *  { event: 'update', data: { pid: 'def'} }
     *  { event: 'update', data: { pid: 'abc'} }
     *  { event: 'finish', ... }
     * ]
     *
     * will become
     * 
     * messages = [
     *  { event: 'update', data: { pid: 'abc'} }
     *  { event: 'update', data: { pid: 'def'} }
     *  { event: 'finish', ... }
     * ]
     *
     * @private
     * @param {IDownloadResponse[]} responseList
     * @memberof DownloadService
     * @return {IDownloadResponse[]} reduced download response list
     */
    private reduceDownloadResponseList( responseList: IDownloadResponse[] ): IDownloadResponse[] {
        const reducedList = [];
        const uniqeItems = {};
        let index      = -1;

        responseList.forEach( (response: IDownloadResponse) => {
            const value = `${response.event}${response.data.pid}`;
            if ( uniqeItems.hasOwnProperty(value) ) {
                const itemIndex = uniqeItems[value];
                reducedList.splice(itemIndex, 1, response);
            } else {
                uniqeItems[value] = ++index;
                reducedList.push(response);
            }
        });

        console.log ( reducedList );

        return reducedList;
    }

    /**
     * handle socket event
     *
     * @private
     * @param {IDownloadResponse} response
     * @memberof DownloadService
     */
    private handleResponse(response: IDownloadResponse) {

        const download: IDownload = response.data;
        const event: string = response.event;

        switch (event) {
            /**
             * connect events sends all current downloads as array
             */
            case DownloadService.SOCKET_EVENT_CONNECTED:
                [].concat(download).forEach( (dl: IDownload) => {
                    this.addDownload(dl);
                });
                break;

            case DownloadService.SOCKET_EVENT_DOWNLOAD_QUEUED:
                this.addDownload(download);
                break;

            default:
                this.updateDownload(download);
        }
    }

    /**
     * add new download to list
     *
     * @private
     * @param {IDownload} download
     * @memberof DownloadService
     */
    private addDownload(download: IDownload) {
        this.downloads.set(download.pid, download);
    }

    /**
     * update existing download
     *
     * @private
     * @param {IDownload} download
     * @memberof DownloadService
     */
    private updateDownload(download: IDownload) {
        if (this.downloads.has(download.pid)) {
            const task = this.downloads.get(download.pid);
            task.loaded = download.loaded;
            task.size   = download.size;
            task.state  = download.state;
        }
    }
}
