import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketManager } from '@app-module/socket';
import { Subject } from 'rxjs/Subject';
import * as PlayerEvents from '../../api/player';

@Component({
  selector: 'app-video-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  public video: any;

  private isDestroyed: Subject<boolean>;

  private socketMananger: SocketManager;

  private paused: boolean;

  private muted: boolean;

  constructor( socketManager: SocketManager) {
    this.socketMananger = socketManager;
    this.isDestroyed = new Subject();
  }

  ngOnInit() {

    this.socketMananger
      .getMessages('video.player')
      .takeUntil(this.isDestroyed)
      .subscribe((responseList: any) => {
          this.handleResponse( responseList );
      });
  }

  public ngOnDestroy() {
    this.isDestroyed.next(true);
    this.isDestroyed.unsubscribe();
  }

  private handleResponse(socketMessage) {

    switch (socketMessage.event) {

      case PlayerEvents.EVENT_PLAYER_PLAY:
        this.video = socketMessage.data.video;
        break;

      case PlayerEvents.EVENT_PLAYER_CLOSE:
        this.video = null;
        break;

      case PlayerEvents.EVENT_PLAYER_CONNECT:
        this.video  = socketMessage.data.video;
        this.paused = ! socketMessage.data.video.play;
        this.muted  = socketMessage.data.video.muted;
        break;
    }
  }
}
