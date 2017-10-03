import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { PaginationModule } from '../pagination/pagination.module';
import { SocketModule } from '../socket/socket.module';
import { VideoListModule, DataProvider } from '../video-list';

import { YoutubeApiProvider } from './provider/youtube-api.provider';
import { DownloadService } from './provider/download.service';

import { DownloadComponent } from './components/download/download.component';
import { FilterComponent } from './components/filter/filter.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    PaginationModule,
    SocketModule,
    VideoListModule
  ],
  providers: [
    DownloadService,
    { provide: DataProvider, useClass: YoutubeApiProvider }
  ],
  declarations: [
    DownloadComponent,
    FilterComponent,
    MainComponent,
  ],
  exports: [
    MainComponent
  ]
})
export class YoutubeModule { }
