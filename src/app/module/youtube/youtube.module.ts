import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncateModule } from 'ng2-truncate';
import { PaginationModule } from '../pagination/pagination.module';
import { FilterModule } from '../filter/filter.module';

import { ApiService } from './provider/api.service';
import { DownloadService } from './provider/download.service';

import { DownloadComponent } from './components/download/download.component';
import { SearchComponent } from '../../components/search/search.component';
import { ItemCardComponent } from './components/item/item-card.component';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    FilterModule,
    FormsModule,
    HttpModule,
    PaginationModule,
    ReactiveFormsModule,
    TruncateModule
  ],
  providers: [
    ApiService,
    DownloadService
  ],
  declarations: [
    DownloadComponent,
    ItemCardComponent,
    ListComponent,
    MainComponent,
    SearchComponent
  ],
  exports: [
    MainComponent
  ]
})
export class YoutubeModule { }
