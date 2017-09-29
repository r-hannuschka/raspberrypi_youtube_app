import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SocketModule } from '../socket/socket.module';
import { DownloadComponent } from './components/download/download.component';
import { YoutubeDownloadService } from './provider/youtube-download.provider';
import { DownloadStateIcon } from './directives/download-state-icon.pipe';

@NgModule({
  imports: [
    CommonModule,
    SocketModule
  ],
  providers: [
      YoutubeDownloadService
  ],
  declarations: [
    DownloadComponent,
    DownloadStateIcon
  ],
  exports: [DownloadComponent]
})
export class YoutubeDownloadModule { }
