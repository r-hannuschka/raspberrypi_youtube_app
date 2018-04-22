import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { SocketManager } from '@app-module/socket';
import { Subject } from 'rxjs/Subject';
import * as PlayerEvents from '../../api/player';

@Component({
  selector: 'app-video-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit, OnDestroy {

  public video: any;

  private isDestroyed: Subject<boolean>;

  private muted: boolean;

  private paused: boolean;

  private socketMananger: SocketManager;

  @HostBinding('class.active')
  private videoActive: boolean;

  constructor( socketManager: SocketManager) {
    this.socketMananger = socketManager;
    this.isDestroyed = new Subject();
    this.muted = false;
  }

  /**
   * connect to player socket stream to get notfied for new messages
   * only take messages until this component get destroyed and
   * remove subscription from socket stream then
   *
   * @memberof PlayerComponent
   */
  ngOnInit() {

    this.socketMananger
      .getMessages('video.player')
      .takeUntil(this.isDestroyed)
      .subscribe((responseList: any) => {
          this.handleResponse( responseList );
      });
  }

  /**
   * component get destroy, send isDestroyed Subject true
   * to remove from socket subscription.
   *
   * @memberof PlayerComponent
   */
  public ngOnDestroy() {
    this.isDestroyed.next(true);
    this.isDestroyed.unsubscribe();
  }

  /**
   * handle socket message
   *
   * @private
   * @param {any} socketMessage
   * @memberof PlayerComponent
   */
  private handleResponse(socketMessage) {

    switch (socketMessage.event) {

      case PlayerEvents.EVENT_PLAYER_PLAY:
        this.onPlayerPlay(socketMessage.data);
        break;

      case PlayerEvents.EVENT_PLAYER_CLOSE:
        this.onPlayerClose();
        break;

      case PlayerEvents.EVENT_PLAYER_CONNECT:
        this.onConnected(socketMessage.data);
        break;
    }
  }

  /**
   * connected to player socket stream
   *
   * @private
   * @param {any} data
   * @returns
   * @memberof PlayerComponent
   */
  private onConnected(data) {
    const {isActive, video} = data;

    if ( ! isActive ) {
      return;
    }

    this.videoActive = true;
    this.video       = video;
    this.muted       = video.muted;
    this.paused      = ! video.play;
  }

  /**
   * player has closed
   *
   * @private
   * @memberof PlayerComponent
   */
  private onPlayerClose() {
    this.videoActive = false;
    this.video       = null;
    this.muted       = false;
    this.paused      = false;
  }

  private onPlayerPlay(data) {
    const video = data.video;
    this.video = video;
    this.videoActive = true;
  }
}
