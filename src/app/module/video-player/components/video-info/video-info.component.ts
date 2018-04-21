import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketManager } from '@app-module/socket';
import { Subject } from 'rxjs/Subject';
import * as PlayerEvents from '../../api/player';

@Component({
  selector: 'app-video-player-info',
  templateUrl: './video-info.component.html'
})
export class VideoInfoComponent implements OnInit, OnDestroy {

  private isDestroyed: Subject<boolean>;

  private socketMananger: SocketManager;

  public video: any;

  constructor( socketManager: SocketManager) {
    this.socketMananger = socketManager;
    this.isDestroyed = new Subject();
  }

  public ngOnInit() {

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
        this.video      = socketMessage.data.video;
        break;
    }
  }
}
