import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketModule } from '@app-module/socket';

import { DownloadComponent } from './components/download/download.component';
import { DownloadService } from './providers/download.service';

@NgModule({
  declarations: [ DownloadComponent ],
  exports: [ DownloadComponent ],
  imports: [
    CommonModule,
    SocketModule
  ],
  providers: [ DownloadService ],
})
export class DownloadModule { }
