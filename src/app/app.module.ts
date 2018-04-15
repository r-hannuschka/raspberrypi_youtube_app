import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DownloadModule } from '@app-module/download';
import { VideoModule } from '@app-module/video';
import { VideoPlayerModule } from '@app-module/video-player';
import { YoutubeModule } from '@app-module/youtube';

import { AppComponent } from './app.component';
import {
  DashboardComponent,
  NavComponent,
  PlayerComponent,
  VideoComponent,
  YoutubePageComponent
} from './components';

import { videoConfig as videoModuleConfig } from './etc/video.config';

import { routes } from './api/data/routes';
import { menuItems } from './api/data/menu-items';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    PlayerComponent,
    YoutubePageComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    DownloadModule,
    RouterModule.forRoot(routes),
    VideoModule.forRoot(videoModuleConfig),
    VideoPlayerModule,
    YoutubeModule
  ],
  providers: [
    { provide: 'MenuItems', useValue: menuItems }
  ],
  entryComponents: [
    DashboardComponent,
    PlayerComponent,
    YoutubePageComponent,
    VideoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
