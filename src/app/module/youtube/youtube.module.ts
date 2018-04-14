import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncateModule } from 'ng2-truncate';

import { PaginationModule } from '@app-module/pagination';
import { FilterModule } from '@app-module/filter';
import { SearchModule } from '@app-module/search';

import { ApiService } from './provider/api.service';

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
    SearchModule,
    TruncateModule
  ],
  providers: [
    ApiService
  ],
  declarations: [
    ItemCardComponent,
    ListComponent
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
