import { Component, Input, ViewEncapsulation } from '@angular/core';
import fontawesome from '@fortawesome/fontawesome';
import { faVolumeOff, faVolumeUp } from '@fortawesome/fontawesome-free-solid';
import { PlayerProvider } from '../../providers/player.provider';

@Component({
  selector: 'app-video-player-controls',
  templateUrl: './controls.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {

  @Input()
  public disabled: boolean;

  @Input()
  public muted: boolean;

  @Input()
  public paused: boolean;

  constructor(
    private playerProvider: PlayerProvider
  ) {
    fontawesome.library.add( faVolumeOff, faVolumeUp);
  }

  public mute() {
    this.playerProvider
      .muteVideo()
      .subscribe( () => {
        this.muted = true;
      });
  }

  public pause() {
    this.playerProvider
      .pauseVideo()
      .subscribe( () => {
        this.paused = true;
      });
  }

  public resume() {
    this.playerProvider
      .resumeVideo()
      .subscribe( () => {
        this.paused = false;
      });
  }

  public poweroff() {
    this.playerProvider
      .powerOff()
      .subscribe( () => {
        // not empty
      });
  }

  public unmute() {
    this.playerProvider
      .unmuteVideo()
      .subscribe( () => {
        this.muted = false;
      });
  }
}
