import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TruncateModule } from 'ng2-truncate';
import { PaginationModule } from '../pagination';

// import components
import { SearchComponent, VideoListComponent, VideoListItemComponent } from './components';

@NgModule({
    exports: [ VideoListComponent ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        PaginationModule,
        ReactiveFormsModule,
        TruncateModule
    ],
    declarations: [ SearchComponent, VideoListComponent, VideoListItemComponent]
})
export class VideoListModule {
}