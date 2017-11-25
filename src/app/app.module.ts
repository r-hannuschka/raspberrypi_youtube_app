import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { YoutubeModule } from './module/youtube/youtube.module';
import { VideoModule } from './module/video/video.module';

import { AppComponent } from './app.component';
import {
  DashboardComponent,
  DownloadComponent,
  YoutubePageComponent,
  NavComponent,
  VideoComponent
} from './components';

import { videoConfig as videoModuleConfig } from './etc/video.config';

import { routes } from './api/data/routes';
import { menuItems } from './api/data/menu-items';

import { DownloadService, SocketManager } from './provider';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DownloadComponent,
    NavComponent,
    YoutubePageComponent,
    VideoComponent,
  ],
  imports: [
    BrowserModule,
    VideoModule.forRoot(videoModuleConfig),
    RouterModule.forRoot(routes),
    YoutubeModule
  ],
  providers: [
    { provide: 'MenuItems', useValue: menuItems },
    DownloadService,
    SocketManager
  ],
  entryComponents: [
    DashboardComponent,
    YoutubePageComponent,
    VideoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
