import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import fontawesome from '@fortawesome/fontawesome';
import { faVolumeOff, faVolumeUp } from '@fortawesome/fontawesome-free-solid';
import { PlayerProvider } from '../../providers/player.provider';

@Component({
  selector: 'app-video-player-controls',
  templateUrl: './controls.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  public videoPaused = false;

  constructor(
    private playerProvider: PlayerProvider
  ) {
    fontawesome.library.add( faVolumeOff, faVolumeUp);
  }

  ngOnInit() {
  }

  public pause() {
    this.playerProvider
      .pauseVideo()
      .subscribe( () => {
        this.videoPaused = true;
      });
  }

  public resume() {
    this.playerProvider
      .resumeVideo()
      .subscribe( () => {
        this.videoPaused = false;
      });
  }
}
