import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncateModule } from 'ng2-truncate';
import { PaginationModule } from '../pagination/pagination.module';
import { FilterModule } from '../filter/filter.module';
import { SocketModule } from '../socket/socket.module';

import { ApiService } from './provider/api.service';
import { DownloadService } from './provider/download.service';

import { SearchComponent } from '../../components/search/search.component';
import { ItemCardComponent } from './components/item/item-card.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    FilterModule,
    FormsModule,
    HttpModule,
    PaginationModule,
    ReactiveFormsModule,
    SocketModule,
    TruncateModule
  ],
  providers: [
    ApiService,
    DownloadService
  ],
  declarations: [
    ItemCardComponent,
    ListComponent,
    SearchComponent
  ],
  entryComponents: [
    ListComponent
  ],
  exports: [
    ListComponent
  ]
})
export class YoutubeModule {
}
