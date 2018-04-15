import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketModule } from '@app-module/socket';
import { ControlsComponent } from './components/controls/controls.component';
import { PlayerComponent } from './components/player/player.component';
import { VideoInfoComponent } from './components/video-info/video-info.component';
import { PlayerProvider } from './providers/player.provider';

@NgModule({
  exports: [PlayerComponent],
  imports: [
    CommonModule,
    SocketModule
  ],
  declarations: [ControlsComponent, PlayerComponent, VideoInfoComponent],
  providers: [PlayerProvider]
})
export class VideoPlayerModule { }
