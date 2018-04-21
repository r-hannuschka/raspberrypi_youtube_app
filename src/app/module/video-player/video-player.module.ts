import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketModule } from '@app-module/socket';
import { ControlsComponent } from './components/controls/controls.component';
import { PlayerComponent } from './components/player/player.component';
import { VideoInfoComponent } from './components/video-info/video-info.component';
import { VideoPlaylistComponent } from './components/video-playlist/video-playlist.component';
import { PlayerProvider } from './providers/player.provider';
import { PlaylistProvider } from './providers/playlist.provider';

@NgModule({
  exports: [PlayerComponent, VideoPlaylistComponent],
  imports: [
    CommonModule,
    SocketModule
  ],
  declarations: [ControlsComponent, PlayerComponent, VideoInfoComponent, VideoPlaylistComponent ],
  providers: [PlayerProvider, PlaylistProvider]
})
export class VideoPlayerModule { }
