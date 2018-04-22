import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketManager } from '@app-module/socket';
import { Subject } from 'rxjs/Subject';
import * as PlayerEvents from '../../api/player';
import { PlaylistProvider } from '../../providers/playlist.provider';

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html'
})
export class VideoPlaylistComponent implements OnInit, OnDestroy {

    private playlist: any[];

    private playlistProvider: PlaylistProvider;

    private socketManager: SocketManager;

    private isDestroyed: Subject<boolean>;

    public constructor(
        playlistProvider: PlaylistProvider,
        socketManager: SocketManager
    ) {
        this.playlistProvider = playlistProvider;
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

    public remove(id: string) {
        this.playlistProvider.remove(id)
            .subscribe( (response) => {
                this.playlist = response.data.playlist;
            });
    }

    private onSocketMessage(message) {

        switch ( message.event ) {
            case PlayerEvents.EVENT_PLAYER_PLAY:
            case PlayerEvents.EVENT_PLAYER_CONNECT:
                this.playlist = message.data.playlist || [];
                break;

            case PlayerEvents.EVENT_PLAYER_CLOSE:
                this.playlist = [];
                break;
        }
    }
}
