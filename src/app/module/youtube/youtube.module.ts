import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncateModule } from 'ng2-truncate';
import { PaginationModule } from '../pagination/pagination.module';
import { YoutubeDownloadModule } from '../youtube-download/youtube-download.module';

import { ApiService } from './provider/api.service';

import { ListComponent } from './components/list/list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MainComponent } from './components/main/main.component';
import { ItemCardComponent } from './components/item/item-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    PaginationModule,
    ReactiveFormsModule,
    TruncateModule,
    YoutubeDownloadModule
  ],
  providers: [
    ApiService
  ],
  declarations: [
    ItemCardComponent,
    ListComponent,
    MainComponent,
    SearchBarComponent
  ],
  exports: [MainComponent]
})
export class YoutubeModule { }
