import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SocketModule } from '../socket/socket.module';
import { DownloadComponent } from './components/download/download.component';
import { YoutubeDownloadService } from './provider/youtube-download.provider';

@NgModule({
  imports: [
    CommonModule,
    SocketModule
  ],
  providers: [
      YoutubeDownloadService
  ],
  declarations: [
    DownloadComponent
  ],
  exports: [DownloadComponent]
})
export class YoutubeDownloadModule { }
