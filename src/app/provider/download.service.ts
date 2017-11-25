import { Injectable } from '@angular/core';
import { SocketManager } from './socket.manager.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/mergeMap';

import { IDownload } from '../api/data/download';
import { IDownloadParam } from '../api/data/download/param';
import { IDownloadResponse } from '../api/socket/download.response';
import { IResponseList } from '../module/youtube/index';

@Injectable()
export class DownloadService {

    public static readonly SOCKET_EVENT_CONNECT = 'connect';

    public static readonly SOCKET_EVENT_DOWNLOAD_QUEUED = 'download_provider.downloadqueued';

    public static readonly SOCKET_EVENT_DOWNLOAD_FINISHED = 'download_provider.downloadend';

    public static readonly SOCKET_EVENT_DOWNLOAD_CANCEL = 'download_provider.downloadcancle';

    public static readonly SOCKET_EVENT_DOWNLOAD_ERROR = 'download_provider.downloaderror';

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
            };
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
                this.handleResponse( responseList );
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
            const value = `${response.event}${(response.data as IDownload).pid}`;
            if ( uniqeItems.hasOwnProperty(value) ) {
                const itemIndex = uniqeItems[value];
                reducedList.splice(itemIndex, 1, response);
            } else {
                uniqeItems[value] = ++index;
                reducedList.push(response);
            }
        });

        return reducedList;
    }

    /**
     * handle socket event
     *
     * @private
     * @param {IDownloadResponse} response
     * @memberof DownloadService
     */
    private handleResponse(responseList: IDownloadResponse[]) {

        const updated: IDownload[] = [];

        responseList.forEach((response: IDownloadResponse) => {
            let download: IDownload | IDownload[];

            if ( response.event === DownloadService.SOCKET_EVENT_CONNECT ) {
                download = response.data as IDownload[];
                download.forEach( (dl: IDownload) => {
                    this.addDownload(dl);
                    updated.push(this.downloads.get(dl.pid));
                });
                return;
            }

            download = response.data as IDownload;

            // create or update task
            const task: IDownload = (response.event === DownloadService.SOCKET_EVENT_DOWNLOAD_QUEUED)
                ? this.addDownload(download)
                : this.updateDownload(download);

            // add task to update list
            let index = -1;
            ((index = updated.indexOf(task) ) !== -1) ? updated.splice(index, 1, task) : updated.push(task);
         });

        // send updated tasks to user
        this.downloadStream.next(updated);
    }

    /**
     * add new download to list
     *
     * @private
     * @param {IDownload} download
     * @memberof DownloadService
     */
    private addDownload(download: IDownload): IDownload {
        this.downloads.set(download.pid, download);
        return download;
    }

    /**
     * update existing download
     *
     * @private
     * @param {IDownload} download
     * @memberof DownloadService
     */
    private updateDownload(download: IDownload): IDownload {
        const task: IDownload = this.downloads.get(download.pid);
        task.loaded = download.loaded;
        task.size   = download.size;
        task.state  = download.state;
        return task;
    }
}
