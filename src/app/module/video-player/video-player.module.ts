import { NgModule, ModuleWithProviders } from '@angular/core';
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
  declarations: [ControlsComponent, PlayerComponent, VideoInfoComponent, VideoPlaylistComponent ]
})
export class VideoPlayerModule {

    public static forRoot(config): ModuleWithProviders {
        return {
            ngModule: VideoPlayerModule,
            providers: [
                { provide: 'PlayerConfig'  , useValue: config.player   },
                { provide: 'PlaylistConfig', useValue: config.playlist },
                PlayerProvider,
                PlaylistProvider
            ]
        };
    }
}
