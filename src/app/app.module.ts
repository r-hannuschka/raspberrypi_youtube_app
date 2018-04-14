import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DownloadModule } from '@app-module/download';
import { VideoModule } from '@app-module/video';
import { YoutubeModule } from '@app-module/youtube';

import { AppComponent } from './app.component';
import {
  DashboardComponent,
  YoutubePageComponent,
  NavComponent,
  VideoComponent
} from './components';

import { videoConfig as videoModuleConfig } from './etc/video.config';

import { routes } from './api/data/routes';
import { menuItems } from './api/data/menu-items';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    YoutubePageComponent,
    VideoComponent,
  ],
  imports: [
    BrowserModule,
    DownloadModule,
    VideoModule.forRoot(videoModuleConfig),
    RouterModule.forRoot(routes),
    YoutubeModule
  ],
  providers: [
    { provide: 'MenuItems', useValue: menuItems }
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
