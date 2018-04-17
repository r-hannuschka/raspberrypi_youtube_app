import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketManager } from '@app-module/socket';
import { Subject } from 'rxjs/Subject';
import * as PlayerEvents from '../../api/player';

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html'
})
export class VideoPlaylistComponent implements OnInit, OnDestroy {

    private socketManager: SocketManager;

    private videoQueue: any[];

    private isDestroyed: Subject<boolean>;

    public constructor(socketManager: SocketManager) {
        this.socketManager = socketManager;
        this.isDestroyed   = new Subject();
    }

    public ngOnInit() {

        this.socketManager
            .getMessages('video.player')
            .takeUntil( this.isDestroyed )
            .subscribe( (message) => {
                this.onSocketMessage(message);
            });
    }

    public ngOnDestroy() {
        this.isDestroyed.next(true);
    }

    private onSocketMessage(message) {

        switch ( message.event ) {
            case PlayerEvents.EVENT_PLAYER_CONNECT:
                this.videoQueue = message.data.videoQueue;
                break;
        }
    }
}
