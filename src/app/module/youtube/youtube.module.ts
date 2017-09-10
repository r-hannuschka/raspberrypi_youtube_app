import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '../pagination/pagination.module';

import { ListComponent } from './components/list/list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    ReactiveFormsModule
  ],
  declarations: [ListComponent, SearchBarComponent, MainComponent],
  exports: [MainComponent]
})
export class YoutubeModule { }
